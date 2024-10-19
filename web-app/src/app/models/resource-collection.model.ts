export interface ResourceCollection<T> {
    items: T[];
    skip?: number | null;
    take?: number | null;
    totalRecords: number;
  }