import { createAction, props } from "@ngrx/store";
import { LearningObjective } from "../../models";

export class LearningObjectivesActions {
    static readonly LOAD = createAction('[Learning Objectives] Load');
    static readonly LOAD_SUCCESS = createAction('[Learning Objectives] Load Success', props<{ learningObjectives: LearningObjective[] }>());
    static readonly LOAD_FAILURE = createAction('[Learning Objectives] Load Failure', props<{ error: any }>());
}