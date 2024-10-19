import { HttpParams } from "@angular/common/http";
import { FilterModel } from "../../models";
import { Helper } from "../../shared/helpers/helper";

export class ServiceHelper {
  static filterToParams(filter: FilterModel) {
    let params = new HttpParams();

    if (filter.fromDate) {
      params = params.append('fromDate', Helper.formatDate(filter.fromDate as Date));
    }
    if (filter.toDate) {
      params = params.append('toDate', Helper.formatDate(filter.toDate as Date));
    }
    if (filter.skip !== undefined) {
      params = params.append('skip', filter.skip.toString());
    }
    if (filter.take !== undefined) {
      params = params.append('take', filter.take.toString());
    }

    return params;
  }
}