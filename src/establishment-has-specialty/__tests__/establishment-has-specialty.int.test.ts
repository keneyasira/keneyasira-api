import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';

describe('EstablishmentHasSpecialtyController', () => {
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
        it('/establishment-has-specialties (GET)', async () => {
            await request(app.getHttpServer())
                .get('/establishment-has-specialties')
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                id: '8112162c-e0a2-4f6f-a2c6-14aa72f6bab0',
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                specialtyId: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                establishment: {
                                    id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
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

        it('/establishment-has-specialties/:id (GET)', async () => {
            await request(app.getHttpServer())
                .get(`/establishment-has-specialties/`)
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        id: '8112162c-e0a2-4f6f-a2c6-14aa72f6bab0',
                        establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        specialtyId: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        establishment: {
                            id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        },
                        specialty: {
                            id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                            name: 'Dermatology',
                        },
                    });
                });
        });

        it('/establishment-has-specialties (POST)', async () => {
            await request(app.getHttpServer())
                .post('/establishment-has-specialties')
                .send({
                    establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                    specialtyId: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        id: '8112162c-e0a2-4f6f-a2c6-14aa72f6bab0',
                        establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        specialtyId: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        establishment: {
                            id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        },
                        specialty: {
                            id: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                            name: 'Cardiology',
                        },
                    });
                });
        });

        it('/establishment-has-specialties/:id (DELETE)', async () => {
            await request(app.getHttpServer())
                .delete(`/establishment-has-specialties/8112162c-e0a2-4f6f-a2c6-14aa72f6bab0`)
                .expect(200);

            await request(app.getHttpServer())
                .get(`/establishment-has-specialties/8112162c-e0a2-4f6f-a2c6-14aa72f6bab0`)
                .expect(404);
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/establishment-has-specialties/invalid-id')
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "invalid-id"',
                            path: '/establishment-has-specialties/invalid-id',
                        }),
                    });
                });
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/establishment-has-specialties/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'Not Found',
                            path: '/establishment-has-specialties/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });
    });
});
