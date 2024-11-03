export type SortOrder = 'ASC' | 'DESC';

export interface SortParams {
    field: string;
    order: SortOrder;
}

export interface SearchParams {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    specialty?: string;
    nameSearch?: string
}

export interface EstablishmentSearchParams {
    name?: string;
    address?: string;
    phone?: string;
    city?: string;
    country?: string;
    specialty?: string;
    locationSearch?:string;
    nameSearch?:string
}

export interface QueryParams {
    limit: number;
    page: number;
    sort: Array<SortParams>;
    tag?: string;
    search?: SearchParams;
    establishmentSearch?: EstablishmentSearchParams;
}

export type QueryParamsWithoutSort = Omit<QueryParams, 'sort'>;