import { Config } from '@config/default';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import basicAuth from 'express-basic-auth';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ApplicationLoggerService } from './core/logger/application.logger.service';
import { Swagger } from './core/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors();
    // see https://expressjs.com/en/guide/behind-proxies.html
    app.enable('trust proxy');
    app.enableShutdownHooks();
    app.disable('etag');

    const config = app.get(Config);
    const { max } = config.ratelimit;

    app.useLogger(app.get(ApplicationLoggerService));

    app.useGlobalPipes(new ValidationPipe());

    app.use(helmet());

    app.use(
        rateLimit({
            skip: (req) => config.logger.omitRoutes.includes(req.path),
            max,
        }),
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    Swagger.createDocument(app);

    app.use(
        ['/webhook/keycloak'],
        basicAuth({
            challenge: true,
            users: {
                [config.keycloak.webhookUsername]: config.keycloak.webhookPassword,
            },
        }),
    );

    await app.listen(config.port);
}

bootstrap();

process.on('uncaughtException', function (err) {
    console.error('An exception was thrown but not catch:', err.message);
    process.exit(1);
});
