import { config } from "../../config/config";
import { ReportTimeFrame } from "../../models";

export class Helper {
  static getDateRange(rangeType: ReportTimeFrame): { fromDate: Date; toDate: Date } {
    const today = new Date(config.dateToday);
    let fromDate: Date;
    let toDate: Date;

    switch (rangeType) {
      case ReportTimeFrame.Daily:
        fromDate = new Date(today.setHours(0, 0, 0, 0));
        toDate = new Date(today.setHours(23, 59, 59, 999));
        break;
      case ReportTimeFrame.Weekly:
        const firstDayOfWeek = today.getDate() - today.getDay();
        fromDate = new Date(today.setDate(firstDayOfWeek));
        fromDate.setHours(0, 0, 0, 0);
        toDate = new Date(today.setDate(firstDayOfWeek + 6));
        toDate.setHours(23, 59, 59, 999);
        break;
      case ReportTimeFrame.Monthly:
        fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
        toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
        break;
      case ReportTimeFrame.Yearly:
        fromDate = new Date(today.getFullYear(), 0, 1);
        toDate = new Date(today.getFullYear(), 12, 0, 23, 59, 59, 999);
        break;
      default:
        throw new Error('Invalid range type');
    }

    return { fromDate, toDate };
  }

  static formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${month}-${day}-${year}`;
  }
}