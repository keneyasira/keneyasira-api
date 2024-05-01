import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../app.module';
import { RequestLoggerInterceptor } from '../logger/request.logger.interceptor';

export async function getTestingModule(): Promise<TestingModule> {
    return (
        Test.createTestingModule({
            imports: [AppModule],
        })
            // ignore request/response logging
            .overrideProvider(RequestLoggerInterceptor)
            .useValue({
                intercept: (ctx: ExecutionContext, next: CallHandler) => next.handle(),
            })
            .compile()
    );
}
