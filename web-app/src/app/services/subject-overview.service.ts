import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { SubjectOverview } from "../models";
import { SubjectOverviewSelectors } from "../store/selectors/subject-overview.selectors";
import { SubjectOverviewActions } from "../store/actions";

@Injectable({ providedIn: 'root' })
export class SubjectOverviewService {
  constructor(
    private readonly store$: Store
  ) { }

  load(): void {
   this.store$.dispatch(SubjectOverviewActions.LOAD());
  }

  subjectsOverview$():  Observable<SubjectOverview[]> {
    return this.store$.pipe(select(SubjectOverviewSelectors.subjectsOverview));
   }

   subjectsOverviewLoading$():  Observable<boolean> {
    return this.store$.pipe(select(SubjectOverviewSelectors.subjectsOverviewLoading));
   }
}
