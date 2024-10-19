import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { FilterModel, ResourceCollection, StudentExamData, StudentOverview } from '../../models';
import { BaseHttpService } from './base-http.service';
import { LearningObjectiveProgress, LearningObjectiveProgressIntermediate, StudentPerformance, SubjectProgress, SubjectProgressIntermediate } from '../../models/student-performance.model';

@Injectable({
  providedIn: 'root',
})
export class StudentHttpService {
  constructor(private readonly baseService: BaseHttpService) { }

  getStudentOverview$(filter: FilterModel): Observable<StudentOverview[]> {
    return this.baseService.getData(filter).pipe(
      map((data: ResourceCollection<StudentExamData>) => {
        const studentOverviewMap: { [key: number]: StudentOverview } = {};

        data.items.forEach(item => {
          const studentId = item.userId;

          if (!studentOverviewMap[studentId]) {
            studentOverviewMap[studentId] = {
              student: { id: studentId, name: `Student ${studentId}`, age: 10, photoUrl: '../../assets/placeholder.jpg' },
              exercisesCompleted: 0,
              totalProgress: 0,
              averageProgress: 0,
              correctAnswers: 0,
            };
          }
          studentOverviewMap[studentId].exercisesCompleted += 1;
          studentOverviewMap[studentId].totalProgress += item.progress;
          if (item.correct === 1) {
            studentOverviewMap[studentId].correctAnswers += 1;
          }
        });

        Object.values(studentOverviewMap).forEach(studentOverview => {
          if (studentOverview.exercisesCompleted > 0) {
            studentOverview.averageProgress = Math.floor(studentOverview.totalProgress / studentOverview.exercisesCompleted)
          }
        });

        return Object.values(studentOverviewMap);
      }),
      catchError(error => throwError(error))
    );
  }


  getStudentPerformance$(studentId: number, filter: FilterModel): Observable<StudentPerformance> {
    return this.baseService.getByStudent(studentId, filter).pipe(
      switchMap((data: ResourceCollection<StudentExamData>) => {
        const groupedByStudent = data.items.reduce((acc, item) => {
          if (!acc[item.userId]) {
            acc[item.userId] = [];
          }
          acc[item.userId].push(item);
          return acc;
        }, {} as Record<number, any[]>);

        return Object.entries(groupedByStudent).map(([userId, exercises]: [string, StudentExamData[]]) => {
          const totalExercises = exercises.length;
          const correctAnswers = exercises.filter(e => e.correct === 1).length;
          const totalProgress = exercises.reduce((sum, ex) => sum + ex.progress, 0);
          const averageProgress = parseFloat((totalProgress / totalExercises).toFixed(2));

          const subjectsMap = exercises.reduce<Record<string, SubjectProgressIntermediate>>((acc, ex) => {
            if (!acc[ex.subject]) {
              acc[ex.subject] = { progress: 0, correctAnswers: 0, total: 0 };
            }

            acc[ex.subject].progress += ex.progress;
            if (ex.correct === 1) acc[ex.subject].correctAnswers++;
            acc[ex.subject].total++;

            return acc;
          }, {});

          const subjects: SubjectProgress[] = Object.entries(subjectsMap).map(([subjectName, subjectData]) => ({
            name: subjectName,
            progress: parseFloat((subjectData.progress / subjectData.total).toFixed(2)),
            correctAnswers: parseFloat(((subjectData.correctAnswers / subjectData.total) * 100).toFixed(2)),
          }));


          const learningObjectivesMap = exercises.reduce(
            (acc: Record<string, LearningObjectiveProgressIntermediate>, ex: StudentExamData) => {
              if (!acc[ex.learningObjective]) {
                acc[ex.learningObjective] = { progress: 0, total: 0 };
              }
              acc[ex.learningObjective].progress += ex.progress;
              acc[ex.learningObjective].total++;
              return acc;
            },
            {} as Record<string, LearningObjectiveProgressIntermediate>
          );

          const learningObjectives: LearningObjectiveProgress[] = Object.entries(learningObjectivesMap).map(
            ([name, data]: [string, LearningObjectiveProgressIntermediate]) => ({
              name,
              progress: parseFloat((data.progress / data.total).toFixed(2))
            })
          );

          const recentActivities = exercises.slice(-8).map(ex => ({
            task: ex.learningObjective,
            completionTime: new Date(ex.submitDateTime).toLocaleTimeString()
          }));

          const strengths: string[] = [];
          const weaknesses: string[] = [];

          subjects.forEach(subject => {
            if (subject.correctAnswers > 75) {
              strengths.push(subject.name);
            } else if (subject.correctAnswers < 25) {
              weaknesses.push(subject.name);
            }
          });

          return {
            student: {
              id: parseInt(userId),
              photoUrl: '../../assets/placeholder.jpg',
              name: `Name_ ${userId}`,
              age: 10
            },
            class: '5A',
            grade: '5',
            attendance: 95,
            progress: averageProgress,
            correctAnswers: parseFloat(((correctAnswers / totalExercises) * 100).toFixed(2)),
            totalExercises,
            subjects,
            learningObjectives,
            strengths: strengths.join(', ') || 'No strengths identified',
            weaknesses: weaknesses.join(', ') || 'No weaknesses identified',
            recentActivities
          } as StudentPerformance;
        });
      })
    )

  }

}
