import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';

describe('EstablishmentHasPracticianController', () => {
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
        it('/establishment-has-practicians (GET)', async () => {
            await request(app.getHttpServer())
                .get('/establishment-has-practicians')
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
                                    updatedAt: expect.any(String),
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                },
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                id: 'bfd18657-9f67-4b1e-b171-98c1ff5e91ff',
                                practician: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    deletedAt: null,
                                    deletedBy: null,
                                    id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                },
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                        ],
                        statusCode: 200,
                        total: 1,
                    });
                });
        });

        it('/establishment-has-practicians/:id (GET)', async () => {
            await request(app.getHttpServer())
                .get(`/establishment-has-practicians/bfd18657-9f67-4b1e-b171-98c1ff5e91ff`)
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
                            id: 'bfd18657-9f67-4b1e-b171-98c1ff5e91ff',
                            practician: {
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                                id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                            },
                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                        statusCode: 200,
                    });
                });
        });

        it('/establishment-has-practicians (POST)', async () => {
            const id = await request(app.getHttpServer())
                .post('/establishment-has-practicians')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    establishmentId: '90b93a53-4109-4182-aa28-d4f3af0b87bb',
                    practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
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
                                address: 'Av. Van Vollenhoven, Bamako, Mali',
                                city: 'Bamako',
                                country: 'Mali',
                                description: '',
                                id: '90b93a53-4109-4182-aa28-d4f3af0b87bb',
                                name: 'Gabriel Toure',
                                phone: '+22379131418',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                            },
                            establishmentId: '90b93a53-4109-4182-aa28-d4f3af0b87bb',
                            id: expect.any(String),
                            practician: {
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                                id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                            },
                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            updatedAt: expect.any(String),
                            updatedBy: null,
                        },
                        statusCode: 201,
                    });
                })
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .delete(`/establishment-has-practicians/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('/establishment-has-practicians/:id (DELETE)', async () => {
            const id = await request(app.getHttpServer())
                .post('/establishment-has-practicians')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    establishmentId: '90b93a53-4109-4182-aa28-d4f3af0b87bb',
                    practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                })
                .expect(201)
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .delete(`/establishment-has-practicians/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);

            await request(app.getHttpServer())
                .get(`/establishment-has-practicians/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(404);
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/establishment-has-practicians/invalid-id')
                .auth(accessToken, { type: 'bearer' })
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
                .auth(accessToken, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'Establishment Has Practician not found',
                            error: 'Not Found',
                            path: '/establishment-has-practicians/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });
    });
});
