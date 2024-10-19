import { ReportTimeFrame } from "./report-time-frame.enum";

export interface FilterModel {
  rangeType: ReportTimeFrame;
  fromDate: Date | null;
  toDate: Date | null;
  reportRangeCustom: boolean;
  studentId: number,
  skip?: number;
  take?: number;
}