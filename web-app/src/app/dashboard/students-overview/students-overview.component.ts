import { Component, OnInit } from '@angular/core';
import { ApplicationArea, StudentOverview } from '../../models';
import { BehaviorSubject, combineLatest, map, Observable, takeUntil } from 'rxjs';
import { StudentIndentityComponent } from './student-indentity/student-indentity.component';
import { BaseComponent } from '../../shared/base/base.component';
import { StudentOverviewService } from '../../services/student-overview.service';
import { FilterComponent } from '../filter/filter.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { StudentPerformance } from '../../models/student-performance.model';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-students-overview',
  standalone: true,
  imports: [StudentIndentityComponent,
    MatTableModule,
    CommonModule,
    FilterComponent,
    MatListModule,
    MatProgressBarModule,
    MatTabsModule,
    MatCardModule,
    FilterComponent,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './students-overview.component.html',
  styleUrl: './students-overview.component.scss'
})
export class StudentsOverviewComponent extends BaseComponent implements OnInit {

  studentsOverViewData$: Observable<StudentOverview[]>;
  filteredStudentsOverViewData$: Observable<StudentOverview[]>;
  studentsOverViewDataLoading$: Observable<boolean>;
  displayedColumns: string[] = ['student', 'totalExercisesCompleted', 'correctAnswers', 'averageProgress'];
  applicationArea: ApplicationArea = ApplicationArea.STUDENT_OVERVIEW;
  noRecords = false;
  studentPerformanceData: StudentPerformance;
  studentPerformanceDataLoaded: boolean = false;
  private filterSubject$ = new BehaviorSubject<string>(''); 
  
  constructor(private readonly studentOverviewService: StudentOverviewService) {
    super();
  }

  ngOnInit(): void {
    this.studentOverviewService.load();
    this.studentsOverViewData$ = this.studentOverviewService.studentOverview$();
    this.studentsOverViewDataLoading$ = this.studentOverviewService.studentOverviewLoading$();
    this.studentsOverViewData$.pipe(takeUntil(this.destroyed$)).subscribe((data: StudentOverview[]) => {
      if (data && data.length) {
        this.onRowClick(data[0])
      }
    });
    this.studentOverviewService.studentPerformance$().pipe(takeUntil(this.destroyed$)).subscribe(
      (performanceData: StudentPerformance) => {
        this.studentPerformanceData = performanceData;
        this.studentPerformanceDataLoaded = true;
      }
    );
    this.filteredStudentsOverViewData$ = combineLatest([this.studentsOverViewData$, this.filterSubject$]).pipe(
      map(([data, filter]: [StudentOverview[], string]) => {
        return data.filter(so => 
          filter ? so.student.name.includes(filter) : true
        );
      })
    );
  }

  onRowClick(studentOverview: StudentOverview): void {
    this.studentOverviewService.loadStudentPerformance(studentOverview.student.id);
  }

  onFilterChange(event: any): void {
    if(event && event.target) {
      this.filterSubject$.next(event.target?.value);
    }
  }
  clearInput(filterValue: HTMLInputElement): void {
    filterValue.value = '';
    this.onFilterChange({target: {value: ""}});
  }
}
