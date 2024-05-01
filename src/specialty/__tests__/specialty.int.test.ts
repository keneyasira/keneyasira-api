import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';

describe('UserTypeController', () => {
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
        it('should get access groups', async () => {

            return request(app.getHttpServer())
                .get('/user-type')
                // .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                createdBy: '5468a7d5-016d-53f1-a333-e0cbb90d4896',
                                id: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                                title: 'Orange',
                                updatedBy: null,
                            },
                            {
                                createdBy: 'aa64ab80-6496-58cc-8be8-f305cbe8a75f',
                                id: '86e54564-9a3f-5da8-88de-3c8cfa5e4901',
                                title: 'Bouygues',
                                updatedBy: null,
                            },
                            {
                                createdBy: 'aa64ab80-6496-58cc-8be8-f305cbe8a75f',
                                id: 'fd3e21a7-cebe-5e06-8a80-7336fa86fcea',
                                title: 'SNCF',
                                updatedBy: null,
                            },
                            {
                                createdBy: '5468a7d5-016d-53f1-a333-e0cbb90d4896',
                                id: 'e0ccb232-dc46-5e73-a6f0-d1c88eeb4191',
                                title: 'Galéries Lafayette',
                                updatedBy: null,
                            },
                            {
                                createdBy: '5468a7d5-016d-53f1-a333-e0cbb90d4896',
                                id: 'f451c29c-f7d5-5d07-88d1-c29e2da82ec1',
                                title: 'Décathlon',
                                updatedBy: null,
                            },
                            {
                                createdBy: '5468a7d5-016d-53f1-a333-e0cbb90d4896',
                                id: '1257cc1b-b77b-5f68-84e1-12ff402bb751',
                                title: 'Jako',
                                updatedBy: null,
                            },
                        ],
                        total: 6,
                    });
                });
        });

        it('should get an access group', async () => {

            return request(app.getHttpServer())
                .get('/user-type/bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1')
                // .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        createdBy: '5468a7d5-016d-53f1-a333-e0cbb90d4896',
                        id: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                        title: 'Orange',
                        updatedBy: null,
                    });
                });
        });

        it('should create an access group', async () => {

            return request(app.getHttpServer())
                .post('/user-type')
                // .auth(token, { type: 'bearer' })
                .send({
                    title: 'PSG',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        createdBy: 'aa64ab80-6496-58cc-8be8-f305cbe8a75f',
                        title: 'PSG',
                        updatedBy: null,
                    });
                });
        });

        it('should update an access group', async () => {

            return request(app.getHttpServer())
                .put('/user-type/bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1')
                // .auth(token, { type: 'bearer' })
                .send({
                    id: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                    title: 'updated.title',
                })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        id: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                        title: 'updated.title',
                    });
                });
        });

        it('should delete an access group', async () => {

            return request(app.getHttpServer())
                .delete('/user-type/bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1')
                // .auth(token, { type: 'bearer' })
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/user-type/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                // .auth(token, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'Not Found',
                            path: '/user-type/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });

        it('should return "Bad Request" with an incorrect ID', async () => {

            await request(app.getHttpServer())
                .get('/user-type/undefined')
                // .auth(token, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/user-type/undefined',
                        }),
                    });
                });
        });
    });
});
