import { createAction, props } from "@ngrx/store";
import { SubjectOverview } from "../../models";

export class SubjectOverviewActions {
    static readonly LOAD = createAction('[Subject Overview] Load');
    static readonly LOAD_SUCCESS = createAction('[Subject Overview] Load success', props<{ subjects: SubjectOverview[] }>());
    static readonly LOAD_FAILURE = createAction('[Subject Overview] Load failure', props<{ error: any }>());
}