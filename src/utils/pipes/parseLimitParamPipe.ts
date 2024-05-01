import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { Config } from '../../../config/default';

@Injectable()
export class ParseLimitParamPipe implements PipeTransform {
    constructor(private readonly config: Config) {}

    transform(value: number, { type }: ArgumentMetadata): number | void {
        if (type !== 'query') return;

        return value ? value : this.config.querySearch.limit.default;
    }
}
