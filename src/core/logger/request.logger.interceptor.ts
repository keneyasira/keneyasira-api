import { Config } from '@config/default';
import {
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import omit from 'lodash.omit';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApplicationLoggerService } from './application.logger.service';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
    constructor(
        private readonly config: Config,
        private readonly logger: ApplicationLoggerService,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request = context.switchToHttp().getRequest<Request>();
        const { method, url } = request;
        const body = omit(request.body, this.config.logger.omitFieldForLogs);

        const now = Date.now();

        return next.handle().pipe(
            tap(
                () => {
                    const response = context.switchToHttp().getResponse<Response>();
                    const { statusCode } = response;

                    this.logger.info(`${method} ${url} ${statusCode} ${Date.now() - now}ms`, body);
                },
                (error: Error) => {
                    let statusCode = 500;

                    if (error instanceof HttpException) {
                        statusCode = error.getStatus();
                    }

                    this.logger.error(`${method} ${url} ${statusCode} ${Date.now() - now}ms`, body);
                },
            ),
        );
    }
}
