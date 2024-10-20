import { Config } from '@config/default';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import isPlainObject from 'lodash.isplainobject';
import transform from 'lodash.transform';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function removeMetadata(object: Record<string, unknown>, blacklist: string[]) {
    return transform<Record<string, unknown>, Record<string, unknown>>(
        object,
        (result, value, key) => {
            if (typeof key === 'string' && blacklist.includes(key)) {
                return;
            }

            if (Array.isArray(value) || isPlainObject(value)) {
                value = removeMetadata(value as Record<string, unknown>, blacklist);
            }

            Object.assign(result as object, { [key]: value });
        },
    );
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(private config: Config) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            map((data) => {
                return {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                    message: data?.message,
                    ...removeMetadata(instanceToPlain(data), this.config.blacklistProperties),
                };
            }),
        );
    }
}
