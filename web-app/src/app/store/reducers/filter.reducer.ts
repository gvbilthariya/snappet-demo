import { createReducer, on } from "@ngrx/store";
import { ReportTimeFrame } from "../../models/report-time-frame.enum";
import { FilterActions } from "../actions/filter.action";
import { FilterModel } from "../../models";

export interface FilterState {
  subjectOverviewFilter: FilterModel
  learningObjectivesFilter: FilterModel,
  studentOverviewFilter: FilterModel
}

const initialState: FilterState = {
  subjectOverviewFilter: {
    rangeType: ReportTimeFrame.Daily,
    reportRangeCustom: false,
  } as FilterModel,
  learningObjectivesFilter: {
    rangeType: ReportTimeFrame.Daily,
    reportRangeCustom: false
  } as FilterModel,
  studentOverviewFilter: {
    rangeType: ReportTimeFrame.Daily,
    reportRangeCustom: false
  } as FilterModel,
};

export const filterReducer = createReducer(
  initialState,
  on(FilterActions.SET_FOR_SUBJECT_OVERVIEW, (state, { filterDataModel }) =>
  ({
    ...state,
    subjectOverviewFilter: { ...state.subjectOverviewFilter, ...filterDataModel}
  })),

  on(FilterActions.SET_FOR_LEARNING_OBJECTIVES, (state, { filterDataModel }) =>
  ({
    ...state,
    learningObjectivesFilter: { ...state.learningObjectivesFilter, ...filterDataModel}
  })),

  on(FilterActions.SET_FOR_STUDENT_OVERVIEW, (state, { filterDataModel }) =>
    ({
      ...state,
      studentOverviewFilter: { ...state.studentOverviewFilter, ...filterDataModel}
    })),
);