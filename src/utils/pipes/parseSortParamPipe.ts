import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { SortParams } from '../../typings/query.typings';

@Injectable()
export class ParseSortPipe implements PipeTransform {
    transform(value: string, { type }: ArgumentMetadata): SortParams[] | void {
        if (type !== 'query') return;

        const sortOptions: SortParams[] = value
            ? JSON.parse(value)
            : [
                  {
                      field: 'createdAt',
                      order: 'DESC',
                  },
              ];

        if (!Array.isArray(sortOptions)) {
            throw new BadRequestException(
                `Bad "sort" query: use the "[{field: 'fieldName', order: 'orderName'}]" format (order can be either "ASC" or "DESC")`,
            );
        }

        return sortOptions;
    }
}
