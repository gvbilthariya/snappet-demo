import { Injectable } from "@angular/core";
import { FilterModel, ResourceCollection, StudentExamData, SubjectOverview } from "../../models";
import { map, Observable } from "rxjs";
import { BaseHttpService } from "./base-http.service";

@Injectable({
  providedIn: 'root',
})
export class SubjectOverviewHttpService {
  constructor(private readonly baseService: BaseHttpService) { }

  getSubjectsOverview$(filter: FilterModel): Observable<SubjectOverview[]> {
    return this.baseService.getData(filter).pipe(
      map((data: ResourceCollection<StudentExamData>) => {
        const result = Object.values(
          data.items.reduce<{ [key: string]: any }>((acc, curr) => {
            const { subject, learningObjective, progress, correct } = curr;

            if (!acc[subject]) {
              acc[subject] = {
                subject: subject,
                totalExercisesCompleted: 0,
                learningObjectives: new Set(),
                totalProgress: 0,
                totalCorrect: 0,
              };
            }

            const subjectData = acc[subject];

            subjectData.totalExercisesCompleted += 1;
            subjectData.learningObjectives.add(learningObjective);
            if (subjectData.totalProgress > 0) {
              subjectData.totalProgress += progress;
            }
            subjectData.totalCorrect += correct;

            return acc;
          }, {})
        );

        const subjectOverview = result.map((subjectData) => {
          return {
            subject: subjectData.subject,
            totalExercisesCompleted: subjectData.totalExercisesCompleted,
            learningObjectives: subjectData.learningObjectives.size,
            averageProgress: Math.floor(subjectData.totalProgress / subjectData.totalExercisesCompleted),
            correctness: Math.floor((subjectData.totalCorrect / subjectData.totalExercisesCompleted) * 100),
          };
        });

        return subjectOverview;
      })
    );
  }
}