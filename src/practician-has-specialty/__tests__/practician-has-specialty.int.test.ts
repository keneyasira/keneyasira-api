import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';

describe('PracticianHasSpecialtyController', () => {
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
        it('/practician-has-specialties (GET)', async () => {
            await request(app.getHttpServer())
                .get('/practician-has-specialties')
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                id: '8112162c-e0a2-4f6f-a2c6-14aa72f6bab0',
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                specialtyId: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                practician: {
                                    id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                },
                                specialty: {
                                    id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                                    name: 'Dermatology',
                                },
                            },
                        ],
                        total: 1,
                    });
                });
        });

        it('/practician-has-specialties/:id (GET)', async () => {
            await request(app.getHttpServer())
                .get(`/practician-has-specialties/`)
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        id: '8112162c-e0a2-4f6f-a2c6-14aa72f6bab0',
                        practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                        specialtyId: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        practician: {
                            id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                        },
                        specialty: {
                            id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                            name: 'Dermatology',
                        },
                    });
                });
        });

        it('/practician-has-specialties (POST)', async () => {
            await request(app.getHttpServer())
                .post('/practician-has-specialties')
                .send({
                    practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                    specialtyId: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        id: '8112162c-e0a2-4f6f-a2c6-14aa72f6bab0',
                        practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                        specialtyId: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        practician: {
                            id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                        },
                        specialty: {
                            id: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                            name: 'Cardiology',
                        },
                    });
                });
        });

        it('/practician-has-specialties/:id (DELETE)', async () => {
            await request(app.getHttpServer())
                .delete(`/practician-has-specialties/8112162c-e0a2-4f6f-a2c6-14aa72f6bab0`)
                .expect(200);

            await request(app.getHttpServer()).get(`/practician-has-specialties/8112162c-e0a2-4f6f-a2c6-14aa72f6bab0`).expect(404);
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/practician-has-specialties/invalid-id')
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "invalid-id"',
                            path: '/practician-has-specialties/invalid-id',
                        }),
                    });
                });
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/practician-has-specialties/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'Not Found',
                            path: '/practician-has-specialties/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });
    });
});