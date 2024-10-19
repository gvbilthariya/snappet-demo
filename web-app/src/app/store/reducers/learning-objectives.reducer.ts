import { createReducer, on } from "@ngrx/store";
import { LearningObjective } from "../../models";
import { LearningObjectivesActions } from "../actions/learning-objectives.actions";

export interface LearningObjectivesState {
    learningObjectives: LearningObjective[];
    loading: boolean;
    error: any;
  }
  
  const initialState: LearningObjectivesState = {
    learningObjectives: [],
    loading: false,
    error: null,
  };
  
  export const learningObjectivesReducer = createReducer(
    initialState,
    on(LearningObjectivesActions.LOAD, state => ({ ...state, error: null, loading: true })),
    on(LearningObjectivesActions.LOAD_SUCCESS, (state, { learningObjectives }) => ({
        ...state,
        loading: false,
        learningObjectives,
        error: null
      })),

    on(LearningObjectivesActions.LOAD_FAILURE, (state, { error }) => ({ ...state, loading: false, error })),
  );