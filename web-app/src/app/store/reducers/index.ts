import { ActionReducerMap } from "@ngrx/store";
import { SubjectsOverviewState, subjectsOverviewReducer } from "./subjects-overview.reducer";
import { learningObjectivesReducer, LearningObjectivesState } from "./learning-objectives.reducer";
import { filterReducer, FilterState } from "./filter.reducer";
import { studentOverviewReducer, StudentOverviewState } from "./student-overview.reducer";

export interface AppState {
  subjectOverviewState: SubjectsOverviewState;
  learningObjectivesState: LearningObjectivesState,
  studentOverviewState: StudentOverviewState,
  filterState: FilterState
}

export const reducers: ActionReducerMap<AppState> = {
  subjectOverviewState: subjectsOverviewReducer,
  learningObjectivesState: learningObjectivesReducer,
  studentOverviewState: studentOverviewReducer,
  filterState: filterReducer
};
