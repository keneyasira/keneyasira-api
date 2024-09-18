import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';

describe('EstablishmentHasPracticianController', () => {
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
        it('/establishment-has-practicians (GET)', async () => {
            await request(app.getHttpServer())
                .get('/establishment-has-practicians')
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                id: 'bfd18657-9f67-4b1e-b171-98c1ff5e91ff',
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                establishment: {
                                    id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                },
                                practician: {
                                    id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                },
                            },
                        ],
                        total: 1,
                    });
                });
        });

        it('/establishment-has-practicians/:id (GET)', async () => {
            await request(app.getHttpServer())
                .get(`/establishment-has-practicians/`)
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        id: 'bfd18657-9f67-4b1e-b171-98c1ff5e91ff',
                        establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        establishment: {
                            id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        },
                        practician: {
                            id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                        },
                    });
                });
        });

        it('/establishment-has-practicians (POST)', async () => {
            await request(app.getHttpServer())
                .post('/establishment-has-practicians')
                .send({
                    establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                    practicianId: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        id: 'bfd18657-9f67-4b1e-b171-98c1ff5e91ff',
                        establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        practicianId: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        establishment: {
                            id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        },
                        practician: {
                            id: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                            userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                        },
                    });
                });
        });

        it('/establishment-has-practicians/:id (DELETE)', async () => {
            await request(app.getHttpServer())
                .delete(`/establishment-has-practicians/bfd18657-9f67-4b1e-b171-98c1ff5e91ff`)
                .expect(200);

            await request(app.getHttpServer())
                .get(`/establishment-has-practicians/bfd18657-9f67-4b1e-b171-98c1ff5e91ff`)
                .expect(404);
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/establishment-has-practicians/invalid-id')
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "invalid-id"',
                            path: '/establishment-has-practicians/invalid-id',
                        }),
                    });
                });
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/establishment-has-practicians/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'Not Found',
                            path: '/establishment-has-practicians/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });
    });
});
