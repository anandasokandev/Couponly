export interface PaginatedData<T> {
  hasNext: boolean;
  hasPrevious: boolean;
  items: T[];
}

export interface PaginatedResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  statusMessage: string;
  data: T;
  errors: any;
}