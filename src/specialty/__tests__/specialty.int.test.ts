import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';

describe('SpecialtyController', () => {
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
        it('should get specialties', async () => {
            await request(app.getHttpServer())
                .get('/specialty')
                // .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                id: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                                name: 'Cardiology',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                            {
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                                name: 'Dermatology',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                        ],
                        total: 2,
                    });
                });
        });

        it('should get a specialty', async () => {
            await request(app.getHttpServer())
                .get('/specialty/bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1')
                // .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        id: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                        name: 'Cardiology',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                    });
                });
        });

        it('should create a specialty', async () => {
            await request(app.getHttpServer())
                .post('/specialty')
                // .auth(token, { type: 'bearer' })
                .send({
                    name: 'Genecology',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({});
                });
        });

        it('should update a specialty', async () => {
            await request(app.getHttpServer())
                .put('/specialty/e47e3b25-5399-4272-ab9b-c87c11d20177')
                // .auth(token, { type: 'bearer' })
                .send({
                    id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                    name: 'updated.title',
                })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                        name: 'updated.title',
                    });
                });
        });

        it('should delete a specialty', async () => {
            await request(app.getHttpServer())
                .delete('/specialty/e47e3b25-5399-4272-ab9b-c87c11d20177')
                // .auth(token, { type: 'bearer' })
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/specialty/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                // .auth(token, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'Not Found',
                            path: '/specialty/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/specialty/undefined')
                // .auth(token, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/specialty/undefined',
                        }),
                    });
                });
        });
    });
});
