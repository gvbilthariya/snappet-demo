import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LearningObjective } from "../models";
import { LearningObjectivesActions } from "../store/actions/learning-objectives.actions";
import { LearningObjectivesSelectors } from "../store/selectors/learning-objectives.selectors";

@Injectable({ providedIn: 'root' })
export class ObjectivesOverviewService {
  constructor(
    private readonly store$: Store
  ) { }

  load(): void {
   this.store$.dispatch(LearningObjectivesActions.LOAD());
  }

  learningObjectives$():  Observable<LearningObjective[]> {
    return this.store$.pipe(select(LearningObjectivesSelectors.learningObjectives));
   }
}
