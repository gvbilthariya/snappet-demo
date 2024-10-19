import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { FilterState } from "../reducers/filter.reducer";
import { FilterModel } from "../../models";

export class FilterSelectors {
    static readonly feature = createFeatureSelector<FilterState>('filterState');

    static readonly subjectOverviewFilter: MemoizedSelector<any, FilterModel> = createSelector(
        FilterSelectors.feature,
        state => state.subjectOverviewFilter
    );

    static readonly learningObjectivesFilter: MemoizedSelector<any, FilterModel> = createSelector(
        FilterSelectors.feature,
        state => state.learningObjectivesFilter
    );
    
    static readonly studentOverviewFilter: MemoizedSelector<any, FilterModel> = createSelector(
        FilterSelectors.feature,
        state => state.studentOverviewFilter
    );
}