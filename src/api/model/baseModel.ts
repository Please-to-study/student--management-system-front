export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export interface CommonFetchResult {
  code: number;
  message: string;
  result: any;
}
