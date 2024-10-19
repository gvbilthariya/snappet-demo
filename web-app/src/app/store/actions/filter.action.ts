import { createAction, props } from "@ngrx/store";
import { FilterModel } from "../../models";

export class FilterActions {
    static readonly SET_FOR_LEARNING_OBJECTIVES = createAction('[Filter] Set Filter for learning Objectives', props<{ filterDataModel: FilterModel }>());
    static readonly SET_FOR_SUBJECT_OVERVIEW = createAction('[Filter] Set Filter for subject overview', props<{ filterDataModel: FilterModel }>());
    static readonly SET_FOR_STUDENT_OVERVIEW = createAction('[Filter] Set Filter for student overview', props<{ filterDataModel: FilterModel }>());
}