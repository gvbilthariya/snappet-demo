import { createReducer, on } from '@ngrx/store';

import { StudentOverview } from '../../models';
import { StudentOverviewActions } from '../actions/student-overview.actions';

export interface StudentOverviewState {
    studentOverviewData: StudentOverview[];
    loading: boolean;
    error: string | null;
}

export const initialState: StudentOverviewState = {
    studentOverviewData: [],
    loading: false,
    error: null,
};

export const studentOverviewReducer = createReducer(
    initialState,
    on(StudentOverviewActions.LOAD, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(StudentOverviewActions.LOAD_SUCCESS, (state, { studentOverviewData }) => ({
        ...state,
        studentOverviewData,
        loading: false,
    })),
    on(StudentOverviewActions.LOAD_FAILURE, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
