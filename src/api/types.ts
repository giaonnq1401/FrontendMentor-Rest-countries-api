export interface IExtraRequest {
  host?: string;
}
export type IRequestInit = RequestInit & IExtraRequest;

export type EmptyObj = Record<string, never>;
export type ObjectLiteral = Record<string, unknown>;

export interface IResponse<Data> {
  code: number;
  msg: string;
  data?: Data;
}
export interface IQueryParams {
  page?: number;
  per_page?: number;
}
export interface IPagination {
  page: number;
  per_page: number;
  total_pages: number;
  total_items: number;
}
export interface IKeyable {
  [key: string]: unknown;
}
export interface ITableResponse {
  pagination: IPagination;
  results: IKeyable[] | [];
}
