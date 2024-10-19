import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { FilterActions } from "../store/actions/filter.action";
import { FilterModel } from "../models/filter.model";

@Injectable({ providedIn: 'root' })
export class FilterService {
  constructor(
    private readonly store$: Store
  ) { }

  learningObjectivesFilterChanged(filterDataModel: FilterModel): void {
    this.store$.dispatch(FilterActions.SET_FOR_LEARNING_OBJECTIVES({ filterDataModel }));
  }

  subjectOverviewFilterChanged(filterDataModel: FilterModel): void {
    this.store$.dispatch(FilterActions.SET_FOR_SUBJECT_OVERVIEW({ filterDataModel }));
  }

  studentOverviewFilterChanged(filterDataModel: FilterModel): void {
    this.store$.dispatch(FilterActions.SET_FOR_STUDENT_OVERVIEW({ filterDataModel }));
  }
}
