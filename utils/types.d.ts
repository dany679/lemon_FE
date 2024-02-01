export interface IPagination {
  count: number;
  page: number;
  limit: number;
  next: boolean;
  skip?: number;
}
export const initialPagination: IPagination = {
  count: 1,
  page: 1,
  limit: 5,
  next: false,
};
