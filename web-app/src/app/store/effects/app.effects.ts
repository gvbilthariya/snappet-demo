import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SubjectOverviewActions } from '../actions';
import { SubjectOverviewHttpService } from '../services';
import { LearningObjectivesActions } from '../actions/learning-objectives.actions';
import { LearningObjectivesHttpService } from '../services/learning-objectives-http.service';
import { FilterSelectors } from '../selectors/filter.selector';
import { Store } from '@ngrx/store';
import { StudentOverviewActions } from '../actions/student-overview.actions';
import { StudentHttpService } from '../services/student-http.service';

@Injectable()
export class AppEffects {
  loadSubjects$ = createEffect(() =>
    combineLatest(this.actions$.pipe(
      ofType(SubjectOverviewActions.LOAD)),
      this.store.select(FilterSelectors.subjectOverviewFilter)
    ).pipe(
      switchMap(([_, filters]) =>
        this.subjectOverviewService.getSubjectsOverview$(filters).pipe(
          map(subjects => SubjectOverviewActions.LOAD_SUCCESS({ subjects })),
          catchError(error => of(SubjectOverviewActions.LOAD_FAILURE({ error })))
        )
      )
    )
  );

  loadLearningObjectives$ = createEffect(() =>
    combineLatest(this.actions$.pipe(
      ofType(LearningObjectivesActions.LOAD)),
      this.store.select(FilterSelectors.learningObjectivesFilter)
    ).pipe(
      switchMap(([_, filters]) =>
        this.learningObjectivesService.getLearningObjectives$(filters).pipe(
          map(learningObjectives => LearningObjectivesActions.LOAD_SUCCESS({ learningObjectives })),
          catchError(error => of(LearningObjectivesActions.LOAD_FAILURE({ error })))
        )
      )
    ));

    loadStudentOverview$ = createEffect(() =>
      combineLatest(this.actions$.pipe(
        ofType(StudentOverviewActions.LOAD)),
        this.store.select(FilterSelectors.studentOverviewFilter)
      ).pipe(
        switchMap(([_, filters]) =>
          this.studentService.getStudentOverview$(filters).pipe(
            map((studentOverviewData) => StudentOverviewActions.LOAD_SUCCESS({ studentOverviewData })),
            catchError((error) => {
              return [StudentOverviewActions.LOAD_FAILURE({ error: error.message })];
            })
          )
        )
      )
    );

    loadStudentPerformance$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StudentOverviewActions.LOAD_STUDENT_PERFORMANCE),
        withLatestFrom(this.store.select(FilterSelectors.studentOverviewFilter))
      ).pipe(
        switchMap(([{studentId}, filters]) =>
          this.studentService.getStudentPerformance$(studentId, filters).pipe(
            map((studentPerformance) => StudentOverviewActions.LOAD_STUDENT_PERFORMANCE_SUCCESS({ studentPerformance })),
            catchError((error) => {
              return [StudentOverviewActions.LOAD_FAILURE({ error: error.message })];
            })
          )
        )
      )
    );

  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly subjectOverviewService: SubjectOverviewHttpService,
    private readonly learningObjectivesService: LearningObjectivesHttpService,
    private readonly studentService: StudentHttpService
  ) { }
}