import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import {
    cleanupKeycloakMock,
    getMockInstance,
    initiliazeKeycloakMock,
} from '../../utils/keycloak-mock.setup';
import { getTestingModule } from '../testing';
describe('Root (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        await initiliazeKeycloakMock();

        const testingModule = await getTestingModule();

        app = testingModule.createNestApplication();

        await app.init();
    });

    afterAll(async () => {
        if (app) await app.close();
        cleanupKeycloakMock();
    });

    describe('/', () => {
        it('should get basic data', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            return request(app.getHttpServer())
                .get('/')
                .auth(token, { type: 'bearer' })
                .set('Authorization', 'Bearer ' + token)
                .expect(200);
        });
    });
});
