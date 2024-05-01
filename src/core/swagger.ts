import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
    static createDocument(app: INestApplication) {
        if (process.env.NODE_ENV !== 'production') {
            const documentBuilder = new DocumentBuilder()
                .setTitle('Smartfit API')
                .setDescription('The smartfit API spec')
                .setVersion('1.0')
                .addBearerAuth()
                .build();

            const document = SwaggerModule.createDocument(app, documentBuilder);

            SwaggerModule.setup('api', app, document);
        }
    }
}
