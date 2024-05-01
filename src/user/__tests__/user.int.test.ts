import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import {
    cleanupKeycloakMock,
    getMockInstance,
    initiliazeKeycloakMock,
} from '../../utils/keycloak-mock.setup';

describe('UserController', () => {
    let app: INestApplication;

    beforeAll(async () => {
    

        const testingModule = await getTestingModule();

        app = testingModule.createNestApplication();

        execSync('make regenerate-db-test');
        await app.init();
    });

    afterAll(async () => {
        if (app) await app.close();
    });

    describe('/', () => {
        it('should delete a user', async () => {

            // create user first
            const id = await request(app.getHttpServer())
                .post('/user')
                // .auth(token, { type: 'bearer' })
                .send({
                    email: 'todelete@todelete.com',
                    firstName: 'todelete',
                    lastName: 'todelete',
                })
                .then(({ body }) => {
                    return body.id;
                });

            return request(app.getHttpServer())
                .delete(`/user/${id}`)
                // .auth(token, { type: 'bearer' })
                .expect(200);
        });

        it('should get users', async () => {

            return request(app.getHttpServer())
                .get('/user')
                // .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                createdBy: '5468a7d5-016d-53f1-a333-e0cbb90d4896',
                                email: 'abdoulaye.traore@keneyasira.com',
                                phone: '+22379131415',
                                firstName: 'Abdoulaye',
                                id: 'aa64ab80-6496-58cc-8be8-f305cbe8a75f',
                                lastName: 'Traore',
                                updatedBy: null,
                            },
                            {
                                createdBy: '5468a7d5-016d-53f1-a333-e0cbb90d4896',
                                email: 'sidi.faskoye@keneyasira.com',
                                phone: '+22379131415',
                                firstName: 'Sidi',
                                id: '5468a7d5-016d-53f1-a333-e0cbb90d4896',
                                lastName: 'Faskoye',
                                updatedBy: null,
                            },
                            {
                                createdBy: '5468a7d5-016d-53f1-a333-e0cbb90d4896',
                                email: 'balobo.maiga@keneyasira.com',
                                phone: '+22379131415',
                                firstName: 'Balobo',
                                id: 'b659287c-55c9-5b35-a3ff-a92ee68ac2f5',
                                lastName: 'Maiga',
                                updatedBy: null,
                            },
                            {
                                createdBy: '5468a7d5-016d-53f1-a333-e0cbb90d4896',
                                email: 'administrator@keneyasira.com',
                                phone: '+22379131415',
                                firstName: 'Admin',
                                id: 'fc15b582-7d11-5726-952d-4ade7ddddfa9',
                                lastName: 'Doctor',
                                updatedBy: null,
                            },
                            {
                                createdBy: '5468a7d5-016d-53f1-a333-e0cbb90d4896',
                                email: 'saidou.toure@keneyasira.com',
                                phone: '+22379131415',
                                firstName: 'Saidou',
                                id: '5ffd2cde-53fb-5155-9b1f-f2955d29ba4d',
                                lastName: 'Toure',
                                updatedBy: null,
                            },
                        ],
                        total: 5,
                    });
                });
        });

        it('should get a user', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            return request(app.getHttpServer())
                .get('/user/aa64ab80-6496-58cc-8be8-f305cbe8a75f')
                // .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        createdBy: '5468a7d5-016d-53f1-a333-e0cbb90d4896',
                        email: 'abdoulaye.traore@smartfit.com',
                        firstName: 'Abdoulaye',
                        id: 'aa64ab80-6496-58cc-8be8-f305cbe8a75f',
                        lastName: 'Traore',
                        updatedBy: null,
                    });
                });
        });

        it('should create a user', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            return request(app.getHttpServer())
                .post('/user')
                // .auth(token, { type: 'bearer' })
                .send({
                    email: 'toto@toto.com',
                    firstName: 'firstName',
                    lastName: 'lastName',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        createdBy: 'aa64ab80-6496-58cc-8be8-f305cbe8a75f',
                        email: 'toto@toto.com',
                        firstName: 'firstName',
                        lastName: 'lastName',
                    });
                });
        });

        it('should update a user', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            // create user first
            const id = await request(app.getHttpServer())
                .post('/user')
                // .auth(token, { type: 'bearer' })
                .send({
                    email: 'titi@titi.com',
                    firstName: 'titi',
                    lastName: 'titi',
                })
                .then(({ body }) => {
                    return body.id;
                });

            return request(app.getHttpServer())
                .put(`/user/${id}`)
                // .auth(token, { type: 'bearer' })
                .send({
                    id,
                    firstName: 'firstName',
                    lastName: 'lastName',
                })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        id,
                        updatedBy: 'aa64ab80-6496-58cc-8be8-f305cbe8a75f',
                        firstName: 'firstName',
                        lastName: 'lastName',
                    });
                });
        });
    });
});
