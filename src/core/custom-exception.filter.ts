import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { BaseError, ValidationError } from 'sequelize';

import { ApplicationLoggerService } from './logger/application.logger.service';

interface Message {
    statusCode: number;
    message: string;
}

interface ThrowMessage extends Message {
    path: string;
    payload?: ReadableStream<Uint8Array>;
}

type CustomError = HttpException | (BaseError & { detail: string });

@Catch(HttpException, BaseError)
export class CustomExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: ApplicationLoggerService) {}

    catch(exception: CustomError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const { url: path } = ctx.getRequest<Request>();
        const { body: payload } = ctx.getRequest<Request>();

        const statusCode = this.getStatusCode(exception);
        const message = this.getMessage(exception);

        const {
            message: errorMessage,
            statusCode: code,
            ...error
        } = this.formatMessage(message, path, statusCode);

        if (payload && Object.keys(payload).length) {
            error.payload = payload;
        }

        response.status(statusCode).json({ error: { ...error, code, message: errorMessage } });
        this.logger.error(errorMessage, { ...error, code });
    }

    getStatusCode(exception: CustomError): number {
        if (exception instanceof HttpException) {
            return exception.getStatus();
        } else if (exception instanceof BaseError) {
            return 400;
        }

        return 500;
    }

    getMessage(exception: CustomError): Message | string {
        if (exception instanceof HttpException) {
            return <Message | string>exception.getResponse();
        } else if (exception instanceof ValidationError) {
            return exception.errors.map((error) => error.message).join('|');
        } else if (exception instanceof BaseError) {
            return exception.message;
        }

        return 'Undefined error';
    }

    formatMessage(message: Message | string, path: string, statusCode: number): ThrowMessage {
        if (typeof message === 'object') {
            return { ...message, path };
        }

        return {
            message,
            path,
            statusCode,
        };
    }
}
