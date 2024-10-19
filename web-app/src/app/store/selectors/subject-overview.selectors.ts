import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SubjectsOverviewState } from "../reducers/subjects-overview.reducer";

export class SubjectOverviewSelectors {
  static readonly feature = createFeatureSelector<SubjectsOverviewState>('subjectOverviewState');

  static readonly subjectsOverview = createSelector(
    SubjectOverviewSelectors.feature,
    state => state.subjects
  );

  static readonly subjectsOverviewLoading = createSelector(
    SubjectOverviewSelectors.feature,
    state => state.loading
  );

  static readonly subjectsOverviewError = createSelector(
    SubjectOverviewSelectors.feature,
    state => state.error
  );
}