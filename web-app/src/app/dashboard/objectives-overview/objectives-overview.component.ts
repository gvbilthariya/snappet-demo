import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ObjectivesOverviewService } from '../../services/objectives-overview.service';
import { ApplicationArea, LearningObjective } from '../../models';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../shared/base/base.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-objectives-overview',
  standalone: true,
  imports: [MatTableModule, CommonModule, FilterComponent, MatExpansionModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './objectives-overview.component.html',
  styleUrl: './objectives-overview.component.scss'
})
export class ObjectivesOverviewComponent extends BaseComponent implements OnInit, AfterViewInit {

  groupedObjectives: { [subject: string]: LearningObjective[] } = {};
  displayedColumns: string[] = ['title', 'totalExercises', 'averageProgress', 'correctAnswersPercentage'];
  subjects: string[] = [];
  applicationArea: ApplicationArea = ApplicationArea.LEARNING_OBJECTIVE;
  noRecords = false;
  @ViewChild(MatAccordion, { static: false }) accordion!: MatAccordion;

  constructor(private readonly objectivesOverviewService: ObjectivesOverviewService) {
    super();
  }
  ngOnInit(): void {
    this.objectivesOverviewService.load();

    this.objectivesOverviewService.learningObjectives$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: LearningObjective[]) => {
        if (data && data.length) {
          this.noRecords = false;
          this.groupedObjectives = data!.reduce<{ [key: string]: any }>((acc, obj) => {
            const subject = obj.subject;
            if (!acc[subject]) {
              acc[subject] = [];
            }
            acc[subject].push(obj);
            return acc;
          }, {});
        }
        else {
          this.noRecords = true;
        }

        this.subjects = Object.keys(this.groupedObjectives)
      });
  }

  ngAfterViewInit(): void {
    if (this.accordion) {
      this.accordion.openAll();
    }
  }
}


