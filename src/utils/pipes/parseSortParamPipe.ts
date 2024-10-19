import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { SortParams } from '../../typings/query.typings';

export const DEFAULT_SORT_PARAMS: SortParams[] = [
    {
        field: 'createdAt',
        order: 'DESC',
    },
];
@Injectable()
export class ParseSortPipe implements PipeTransform {
    transform(value: string, { type }: ArgumentMetadata): SortParams[] | void {
        if (type !== 'query') return;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const sortOptions: SortParams[] = value ? JSON.parse(value) : DEFAULT_SORT_PARAMS;

        if (!Array.isArray(sortOptions)) {
            throw new BadRequestException(
                `Bad "sort" query: use the "[{field: 'fieldName', order: 'orderName'}]" format (order can be either "ASC" or "DESC")`,
            );
        }

        return sortOptions;
    }
}
