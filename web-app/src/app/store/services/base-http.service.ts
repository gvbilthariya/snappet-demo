import { Injectable } from "@angular/core";
import { FilterModel, ResourceCollection, StudentExamData } from "../../models";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Helper } from "../../shared/helpers/helper";
import { environment } from "../../../environments/environment";
import { ServiceHelper } from "./helper";

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  readonly baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getData(filter: FilterModel): Observable<ResourceCollection<StudentExamData>> {
    const filterObj = { ...filter };
    if (!filterObj.reportRangeCustom) {
      const { fromDate, toDate } = Helper.getDateRange(filterObj.rangeType);
      filterObj.fromDate = fromDate;
      filterObj.toDate = toDate;
    }

    let params = ServiceHelper.filterToParams(filterObj);

    return this.http.get<ResourceCollection<StudentExamData>>(`${this.baseUrl}/answers/search`, { params });
  }

  getByStudent(id: number, filter: FilterModel): Observable<ResourceCollection<StudentExamData>> {
    const filterObj = { ...filter };
    if (!filterObj.reportRangeCustom) {
      const { fromDate, toDate } = Helper.getDateRange(filterObj.rangeType);
      filterObj.fromDate = fromDate;
      filterObj.toDate = toDate;
    }

    let params = ServiceHelper.filterToParams(filterObj);

    return this.http.get<ResourceCollection<StudentExamData>>(`${this.baseUrl}/answers/by-student/${id}`, { params });
  }
}