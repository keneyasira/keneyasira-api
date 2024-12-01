import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import { JwtService } from '@nestjs/jwt';

describe('EstablishmentTypeController', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let accessToken: string;

    beforeAll(async () => {
        const testingModule = await getTestingModule();

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
            clientType: 'admin',
        });

        await app.init();
    });

    afterAll(async () => {
        if (app) await app.close();
    });

    describe('/', () => {
        it('should get establishment types', async () => {
            await request(app.getHttpServer())
                .get('/establishment-types')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                id: '4d37ada2-8652-4268-b202-0db16fef70ba',
                                name: 'hospital',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                            },
                            {
                                id: 'f02e3ec7-f1ee-4025-910f-c5d4f376da31',
                                name: 'clinic',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                            },
                            {
                                id: 'efee12b0-cef3-4235-a6fd-76241af46611',
                                name: 'community_health_center',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                            },
                        ],
                        total: 4,
                        statusCode: 200,
                    });
                });
        });

        it('should get an establishment type', async () => {
            await request(app.getHttpServer())
                .get('/establishment-types/4d37ada2-8652-4268-b202-0db16fef70ba')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: {
                            id: '4d37ada2-8652-4268-b202-0db16fef70ba',
                            name: 'hospital',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            createdAt: '2024-05-20T23:13:00.000Z',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            deletedAt: null,
                            deletedBy: null,
                        },
                        statusCode: 200,
                    });
                });
        });

        it('should create an establishment type', async () => {
            const id = await request(app.getHttpServer())
                .post('/establishment-types')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    name: 'dispensary',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        data: {
                            id: expect.any(String),
                            name: 'dispensary',
                            createdBy: null,
                            updatedBy: null,
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                        },
                        statusCode: 201,
                    });
                })
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .delete(`/establishment-types/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should update an establishment type', async () => {
            const id = await request(app.getHttpServer())
                .post('/establishment-types')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    name: 'update',
                })
                .expect(201)
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .put(`/establishment-types/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .send({
                    id,
                    name: 'updated.title',
                })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        data: {
                            id,
                            name: 'updated.title',
                            createdBy: null,
                            updatedBy: null,
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                        },

                        statusCode: 200,
                    });
                });

            await request(app.getHttpServer())
                .delete(`/establishment-types/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should delete an establishment type', async () => {
            const id = await request(app.getHttpServer())
                .post('/establishment-types')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    name: 'delete',
                })
                .expect(201)
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .delete(`/establishment-types/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/establishment-types/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                .auth(accessToken, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'establishment status not found',
                            error: 'Not Found',
                            path: '/establishment-types/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/establishment-types/undefined')
                .auth(accessToken, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/establishment-types/undefined',
                        }),
                    });
                });
        });
    });
});
