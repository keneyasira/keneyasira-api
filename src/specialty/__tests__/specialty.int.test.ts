import { INestApplication } from '@nestjs/common';

import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';

describe('SpecialtyController', () => {
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
            clientType: 'admin',
        });

        await app.init();
    });

    afterAll(async () => {
        if (app) await app.close();
    });

    describe('/', () => {
        it('should get specialties', async () => {
            await request(app.getHttpServer())
                .get('/specialties')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                id: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                                name: 'Cardiology',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                            },
                            {
                                id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                                name: 'Dermatology',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                            },
                        ],
                        statusCode: 200,
                        total: 2,
                    });
                });
        });

        it('should get a specialty', async () => {
            await request(app.getHttpServer())
                .get('/specialties/bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: {
                            id: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
                            name: 'Cardiology',
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

        it('should create a specialty', async () => {
            const id = await request(app.getHttpServer())
                .post('/specialties')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    name: 'Genecology',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({});
                })
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .delete(`/specialties/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should update a specialty', async () => {
            const id = await request(app.getHttpServer())
                .post('/specialties')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    name: 'test',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({});
                })
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .put(`/specialties/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .send({
                    id,
                    name: 'updated.title',
                })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        data: {
                            createdAt: expect.any(String),
                            createdBy: null,
                            deletedAt: null,
                            deletedBy: null,
                            id: expect.any(String),
                            name: 'updated.title',
                            updatedAt: expect.any(String),
                            updatedBy: null,
                        },
                        statusCode: 200,
                    });
                });

            await request(app.getHttpServer())
                .delete(`/specialties/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should delete a specialty', async () => {
            const id = await request(app.getHttpServer())
                .post('/specialties')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    name: 'to delete',
                })
                .expect(201)
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .delete(`/specialties/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/specialties/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                .auth(accessToken, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            error: 'Not Found',
                            message: 'Specialty not found',
                            path: '/specialties/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/specialties/undefined')
                .auth(accessToken, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/specialties/undefined',
                        }),
                    });
                });
        });
    });
});
