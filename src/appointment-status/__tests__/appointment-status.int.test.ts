import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import { JwtService } from '@nestjs/jwt';

describe('AppointmentStatusController', () => {
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
        });

        await app.init();
    });

    afterAll(async () => {
        if (app) await app.close();
    });

    describe('/', () => {
        it('should get appointment statuses', async () => {
            await request(app.getHttpServer())
                .get('/appointment-statuses')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                id: '186620b3-a831-440d-a4c7-f0ebc90b9d89',
                                name: 'scheduled',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                            },
                            {
                                id: 'cc265f80-e8af-4539-bfc2-e83d5cc4f8d3',
                                name: 'cancelled',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                            },
                            {
                                id: '665b47d5-5ec3-4199-b3f1-87a9aa71d9e6',
                                name: 'completed',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                            },
                            {
                                id: '452da462-61fc-4809-aa50-a712a0f5231c',
                                name: 'no_show',
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

        it('should get an appointment status', async () => {
            await request(app.getHttpServer())
                .get('/appointment-statuses/186620b3-a831-440d-a4c7-f0ebc90b9d89')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: {
                            id: '186620b3-a831-440d-a4c7-f0ebc90b9d89',
                            name: 'scheduled',
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

        it('should create an appointment status', async () => {
            const id = await request(app.getHttpServer())
                .post('/appointment-statuses')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    name: 'awaiting_confirmation',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        data: {
                            id: expect.any(String),
                            name: 'awaiting_confirmation',
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
                .delete(`/appointment-statuses/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should update an appointment status', async () => {
            const id = await request(app.getHttpServer())
                .post('/appointment-statuses')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    name: 'awaiting_confirmation',
                })
                .expect(201)
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .put(`/appointment-statuses/${id}`)
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
                .delete(`/appointment-statuses/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should delete an appointment status', async () => {
            const id = await request(app.getHttpServer())
                .post('/appointment-statuses')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    name: 'awaiting_confirmation',
                })
                .expect(201)
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .delete(`/appointment-statuses/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/appointment-statuses/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                .auth(accessToken, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'Appointment status not found',
                            error: 'Not Found',
                            path: '/appointment-statuses/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/appointment-statuses/undefined')
                .auth(accessToken, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/appointment-statuses/undefined',
                        }),
                    });
                });
        });
    });
});
