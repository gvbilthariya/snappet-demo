import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { StudentOverviewActions } from "../store/actions/student-overview.actions";
import { StudentOverview } from "../models";
import { StudentOverviewSelectors } from "../store/selectors/student-overview.selectors";
import { StudentPerformance } from "../models/student-performance.model";
import { Actions, ofType } from "@ngrx/effects";

@Injectable({ providedIn: 'root' })
export class StudentOverviewService {
    constructor(
        private readonly store$: Store,
        private readonly actions$: Actions
    ) { }

    load(): void {
        this.store$.dispatch(StudentOverviewActions.LOAD());
    }

    studentOverview$(): Observable<StudentOverview[]> {
        return this.store$.pipe(select(StudentOverviewSelectors.studentOverview));
    }

    studentOverviewLoading$(): Observable<boolean> {
        return this.store$.pipe(select(StudentOverviewSelectors.studentOverviewLoading));
    }

    loadStudentPerformance(studentId: number): void {
        this.store$.dispatch(StudentOverviewActions.LOAD_STUDENT_PERFORMANCE({ studentId }));
    }

    studentPerformance$(): Observable<StudentPerformance> {
        return this.actions$.pipe(ofType(StudentOverviewActions.LOAD_STUDENT_PERFORMANCE_SUCCESS)).pipe(map(({ studentPerformance }) => studentPerformance));
    }
}
