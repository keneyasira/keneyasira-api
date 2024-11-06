import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';

describe('EstablishmentHasSpecialtyController', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let accessToken: string;

    beforeAll(async () => {
        const testingModule: TestingModule = await getTestingModule();
        app = testingModule.createNestApplication();
        jwtService = testingModule.get(JwtService);

        // Manually generate a token with a test payload
        accessToken = jwtService.sign({
            id: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            sub: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            email: 'admin@keneyasira.com',
            phone: '+22379131414',
            roles: ['admin'], // Example role
            secret: 'secret',
        });

        await app.init();
    });

    afterAll(async () => {
        if (app) await app.close();
    });

    describe('/', () => {
        it('/establishment-has-specialties (GET)', async () => {
            await request(app.getHttpServer())
                .get('/establishment-has-specialties')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                                establishment: {
                                    address: 'Rue Kati, Bamako, Mali',
                                    city: 'Bamako',
                                    country: 'Mali',
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    deletedAt: null,
                                    deletedBy: null,
                                    description: '',
                                    id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                    name: 'Point G',
                                    phone: '+22379131419',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                },
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                id: '77a093ae-2d0c-4cac-b8cb-c4bbb035439a',
                                specialty: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    deletedAt: null,
                                    deletedBy: null,
                                    id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                                    name: 'Dermatology',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                },
                                specialtyId: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                        ],
                        total: 1,
                        statusCode: 200,
                    });
                });
        });

        it('/establishment-has-specialties/:id (GET)', async () => {
            await request(app.getHttpServer())
                .get(`/establishment-has-specialties/77a093ae-2d0c-4cac-b8cb-c4bbb035439a`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: {
                            createdAt: '2024-05-20T23:13:00.000Z',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            deletedAt: null,
                            deletedBy: null,
                            establishment: {
                                address: 'Rue Kati, Bamako, Mali',
                                city: 'Bamako',
                                country: 'Mali',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                                description: '',
                                id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                name: 'Point G',
                                phone: '+22379131419',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                            establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            id: '77a093ae-2d0c-4cac-b8cb-c4bbb035439a',
                            specialty: {
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                                id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                                name: 'Dermatology',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                            specialtyId: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                        statusCode: 200,
                    });
                });
        });

        it('/establishment-has-specialties (POST)', async () => {
            const id = await request(app.getHttpServer())
                .post('/establishment-has-specialties')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                    specialtyId: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: {
                            createdAt: expect.any(String),
                            createdBy: null,
                            deletedAt: null,
                            deletedBy: null,
                            establishment: {
                                address: 'Rue Kati, Bamako, Mali',
                                city: 'Bamako',
                                country: 'Mali',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                                description: '',
                                id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                name: 'Point G',
                                phone: '+22379131419',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                            establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            id: expect.any(String),
                            specialty: {
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                                id: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                                name: 'Cardiology',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                            specialtyId: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                            updatedAt: expect.any(String),
                            updatedBy: null,
                        },
                        statusCode: 201,
                    });
                })
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .delete(`/establishment-has-specialties/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('/establishment-has-specialties/:id (DELETE)', async () => {
            const id = await request(app.getHttpServer())
                .post('/establishment-has-specialties')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                    specialtyId: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                })
                .expect(201)
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .delete(`/establishment-has-specialties/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);

            await request(app.getHttpServer())
                .get(`/establishment-has-specialties/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(404);
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/establishment-has-specialties/invalid-id')
                .auth(accessToken, { type: 'bearer' })
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
                .auth(accessToken, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'Establishment Has Specialty not found',
                            error: 'Not Found',
                            path: '/establishment-has-specialties/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });
    });
});
