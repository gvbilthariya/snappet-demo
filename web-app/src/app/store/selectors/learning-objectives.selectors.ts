import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LearningObjectivesState } from "../reducers/learning-objectives.reducer";

export class LearningObjectivesSelectors {
  static readonly feature = createFeatureSelector<LearningObjectivesState>('learningObjectivesState');

  static readonly learningObjectives = createSelector(
    LearningObjectivesSelectors.feature,
    state => state.learningObjectives
  );

  static readonly learningObjectivesLoading = createSelector(
    LearningObjectivesSelectors.feature,
    state => state.loading
  );

  static readonly learningObjectivesError = createSelector(
    LearningObjectivesSelectors.feature,
    state => state.error
  );
}