import { SortOrder, SortParams } from '../typings/query.typings';

export function transformSortParamsToSequelizeFormat(
    sortOptions: SortParams[],
): [string, SortOrder][] {
    return sortOptions.map(({ field, order }) => [field, order]);
}
