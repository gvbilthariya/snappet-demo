import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StudentOverviewState } from "../reducers/student-overview.reducer";

export class StudentOverviewSelectors {
  static readonly feature = createFeatureSelector<StudentOverviewState>('studentOverviewState');

  static readonly studentOverview = createSelector(
    StudentOverviewSelectors.feature,
    state => state.studentOverviewData
  );

  static readonly studentOverviewLoading = createSelector(
    StudentOverviewSelectors.feature,
    state => state.loading
  );

  static readonly studentOverviewError = createSelector(
    StudentOverviewSelectors.feature,
    state => state.error
  );
}