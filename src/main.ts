import { Config } from '@config/default';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { Request, Response } from 'express';
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

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    app.use(helmet());

    app.use(
        rateLimit({
            skip: (req) => config.logger.omitRoutes.includes(req.path),
            max,
            validate: { trustProxy: false },
        }),
    );

    //middleware to intercept response.json()
    app.use((req: Request, res: Response, next: () => void) => {
        const originalJson = res.json;

        // Override the json function
        res.json = function (body: Record<string, unknown>) {
            const data = { ...body };

            return originalJson.call(this, { data });
        };

        next();
    });

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    Swagger.createDocument(app);

    await app.listen(config.port);
}

void bootstrap();

process.on('uncaughtException', function (err) {
    console.error('An exception was thrown but not catch:', err.message);
    process.exit(1);
});
