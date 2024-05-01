export type SortOrder = 'ASC' | 'DESC';

export interface SortParams {
    field: string;
    order: SortOrder;
}

export interface QueryParams {
    limit: number;
    page: number;
    sort: Array<SortParams>;
    tag?: string;
}

export type QueryParamsWithoutSort = Omit<QueryParams, 'sort'>;
