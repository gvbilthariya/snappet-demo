import { createReducer, on } from "@ngrx/store";
import { SubjectOverview } from "../../models";
import { SubjectOverviewActions } from "../actions";

export interface SubjectsOverviewState {
    subjects: SubjectOverview[];
    loading: boolean;
    error: any;
  }
  
  const initialState: SubjectsOverviewState = {
    subjects: [],
    loading: false,
    error: null,
  };
  
  export const subjectsOverviewReducer = createReducer(
    initialState,
    on(SubjectOverviewActions.LOAD, state => ({ ...state, loading: true })),
    on(SubjectOverviewActions.LOAD_SUCCESS, (state, { subjects }) => ({ ...state, loading: false, subjects })),
    on(SubjectOverviewActions.LOAD_FAILURE, (state, { error }) => ({ ...state, loading: false, error })),
  );