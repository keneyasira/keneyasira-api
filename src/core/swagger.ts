import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';

export class Swagger {
    static createDocument(app: INestApplication) {
        if (process.env.NODE_ENV !== 'production') {
            const documentBuilder = new DocumentBuilder()
                .setTitle('keneyasira API')
                .setDescription('The keneyasira API spec')
                .setVersion('1.0')
                .addBearerAuth()
                .build();

            app.use(
                ['/api-docs', '/api-docs-json'],
                basicAuth({
                    challenge: true,
                    // this is the username and password used to authenticate
                    users: { api: 'api' },
                }),
            );

            const document = SwaggerModule.createDocument(app, documentBuilder);

            SwaggerModule.setup('api-docs', app, document, {
                jsonDocumentUrl: 'api-docs/json',
            });
        }
    }
}
