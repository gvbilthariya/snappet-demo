import { createAction, props } from '@ngrx/store';
import { StudentOverview } from '../../models';
import { StudentPerformance } from '../../models/student-performance.model';

export class StudentOverviewActions {
    static readonly LOAD = createAction(
        '[Student Overview] Load'
      );
      static readonly LOAD_SUCCESS = createAction(
        '[Student Overview] Load Success',
        props<{ studentOverviewData: StudentOverview[] }>()
      );
      
      static readonly LOAD_FAILURE = createAction(
        '[Student Overview] Load Failure',
        props<{ error: string }>()
      );

      static readonly LOAD_STUDENT_PERFORMANCE = createAction(
        '[Student Overview] Load Student Performance', props<{ studentId: number }>()
      );

      static readonly LOAD_STUDENT_PERFORMANCE_SUCCESS = createAction(
        '[Student Overview] Load Student Performance Success', props<{ studentPerformance: StudentPerformance }>()
      );
}


