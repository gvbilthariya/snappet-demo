import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BaseComponent } from '../../shared/base/base.component';
import { SubjectOverviewService } from '../../services';
import { map, Observable, takeUntil } from 'rxjs';
import { ApplicationArea, SubjectOverview } from '../../models';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [MatTableModule, CommonModule, FilterComponent, MatProgressBarModule, MatProgressSpinnerModule],
  templateUrl: './subjects-overview.component.html',
  styleUrl: './subjects-overview.component.scss'
})

export class SubjectsOverviewComponent extends BaseComponent implements OnInit {

  subjectsOverViewData$: Observable<SubjectOverview[]>;
  subjectsOverViewDataLoading$: Observable<boolean>;
  displayedColumns: string[] = ['Subject', 'exercisesCompleted', 'learningObjectives', 'averageProgress', 'correctAnswers'];
  applicationArea: ApplicationArea = ApplicationArea.SUBJECT_OVERVIEW;
  noRecords = false;

  constructor(private readonly subjectOverviewService: SubjectOverviewService) {
    super();
  }

  ngOnInit(): void {
    this.subjectsOverViewData$ = this.subjectOverviewService.subjectsOverview$();
    this.subjectsOverViewDataLoading$ = this.subjectOverviewService.subjectsOverviewLoading$();
    this.subjectOverviewService.load();
  }

  getTotalEC$(): Observable<number> {
    return this.subjectsOverViewData$.pipe(
      map((data: SubjectOverview[]) => data!.reduce((total, current) => total + current.totalExercisesCompleted, 0)));
  }

  getTotalLO$(): Observable<number> {
    return this.subjectsOverViewData$.pipe(
      map((data: SubjectOverview[]) => data!.reduce((total, current) => total + current.learningObjectives, 0)));
  }
}
