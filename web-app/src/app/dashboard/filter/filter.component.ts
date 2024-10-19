import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApplicationArea, SelectViewModel } from '../../models';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BaseComponent } from '../../shared/base/base.component';
import { takeUntil } from 'rxjs';
import { ReportTimeFrame } from '../../models/report-time-frame.enum';
import { FilterService } from '../../services/filter.service';
import { MatButtonModule } from '@angular/material/button';
import { FilterModel } from '../../models/filter.model';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent extends BaseComponent implements OnInit {

  @Input()
  applicationArea: ApplicationArea;

  form: FormGroup;
  filterModel: FilterModel;
  reportRangeCustom: boolean = false;
  fixedTimeFrames: SelectViewModel[] = [
    { value: ReportTimeFrame.Daily, viewValue: ReportTimeFrame.Daily },
    { value: ReportTimeFrame.Monthly, viewValue: ReportTimeFrame.Monthly },
    { value: ReportTimeFrame.Custom, viewValue: ReportTimeFrame.Custom },
  ];

  get rangeGroup(): FormGroup {
    return this.form.get('rangeGroup') as FormGroup;
  }

  get isRangeControlValid(): boolean {
    return this.reportRangeCustom 
    && (!this.rangeGroup.controls['start'].pristine && this.rangeGroup.controls['start'].valid) 
    && (!this.rangeGroup.controls['end'].pristine && this.rangeGroup.controls['end'].valid);
  }

  constructor(private fb: FormBuilder, private readonly filterService: FilterService) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      reportTimeFrame: new FormControl(this.fixedTimeFrames[0].value),
      rangeGroup: this.fb.group({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
      })
    });

    this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(formData => {
      this.reportRangeCustom = formData.reportTimeFrame === ReportTimeFrame.Custom;
      if (!this.reportRangeCustom) {
        this.setFilterModel();
        this.emitFilterChanged();
      }
    })
  }

  customRangeChanged(): void {
    this.setFilterModel();
    this.emitFilterChanged();
  }

  setFilterModel(): void {
    this.filterModel = {
      rangeType: this.form.controls['reportTimeFrame'].value as ReportTimeFrame,
      fromDate: this.rangeGroup.controls['start'].value,
      toDate: this.rangeGroup.controls['end'].value,
      reportRangeCustom: this.reportRangeCustom,
    } as FilterModel;
  }

  emitFilterChanged(): void {
    if (this.applicationArea === ApplicationArea.SUBJECT_OVERVIEW)
      this.filterService.subjectOverviewFilterChanged(this.filterModel);
    if (this.applicationArea === ApplicationArea.LEARNING_OBJECTIVE)
      this.filterService.learningObjectivesFilterChanged(this.filterModel);
    if (this.applicationArea === ApplicationArea.STUDENT_OVERVIEW)
      this.filterService.studentOverviewFilterChanged(this.filterModel);
  }
}
