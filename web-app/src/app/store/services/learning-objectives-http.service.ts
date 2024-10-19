import { Injectable } from "@angular/core";
import { FilterModel, LearningObjective, ResourceCollection, StudentExamData } from "../../models";
import { map, Observable } from "rxjs";
import { BaseHttpService } from "./base-http.service";

@Injectable({
  providedIn: 'root',
})
export class LearningObjectivesHttpService {
  constructor(private readonly baseService: BaseHttpService) { }

  getLearningObjectives$(filter: FilterModel): Observable<LearningObjective[]> {
    return this.baseService.getData(filter).pipe(
      map((data: ResourceCollection<StudentExamData>) => {
        const objectivesMap: { [key: string]: LearningObjective } = {};
        data.items.forEach(record => {
          const title = record.learningObjective;
          const subject = record.subject;

          if (!objectivesMap[title]) {
            objectivesMap[title] = {
              title: title,
              totalExercises: 0,
              averageProgress: 0,
              correctAnswersPercentage: 0,
              subject: subject,
            };
          }

          const objective = objectivesMap[title];
          objective.totalExercises += 1;
          if (record.progress >= 0) {
            objective.averageProgress += record.progress;
          }
          objective.correctAnswersPercentage += record.correct;
        });

        const learningObjectiveData = Object.values(objectivesMap).map(obj => ({
          title: obj.title,
          totalExercises: obj.totalExercises,
          averageProgress: Math.floor(obj.averageProgress / obj.totalExercises),
          correctAnswersPercentage: Math.floor((obj.correctAnswersPercentage / obj.totalExercises) * 100),
          subject: obj.subject,
        }));

        return learningObjectiveData;
      })
    );
  }
}