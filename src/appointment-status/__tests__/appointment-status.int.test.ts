import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';

describe('AppointmentStatusController', () => {
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
        it('should get appointment statuses', async () => {
            await request(app.getHttpServer())
                .get('/appointment-statuses')
                // .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                id: '186620b3-a831-440d-a4c7-f0ebc90b9d89',
                                name: 'scheduled',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                            },
                            {
                                id: 'cc265f80-e8af-4539-bfc2-e83d5cc4f8d3',
                                name: 'cancelled',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                            },
                            {
                                id: '665b47d5-5ec3-4199-b3f1-87a9aa71d9e6',
                                name: 'completed',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                            },
                        ],
                        total: 3,
                    });
                });
        });

        it('should get an appointment status', async () => {
            await request(app.getHttpServer())
                .get('/appointment-statuses/186620b3-a831-440d-a4c7-f0ebc90b9d89')
                // .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        id: '186620b3-a831-440d-a4c7-f0ebc90b9d89',
                        name: 'scheduled',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    });
                });
        });

        it('should create an appointment status', async () => {
            await request(app.getHttpServer())
                .post('/specialty')
                // .auth(token, { type: 'bearer' })
                .send({
                    name: 'awaiting_confirmation',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        id: expect.any(String),
                        name: 'awaiting_confirmation',
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    });
                });
        });

        it('should update an appointment status', async () => {
            await request(app.getHttpServer())
                .put('/appointment-statuses/186620b3-a831-440d-a4c7-f0ebc90b9d89')
                // .auth(token, { type: 'bearer' })
                .send({
                    id: '186620b3-a831-440d-a4c7-f0ebc90b9d89',
                    name: 'updated.title',
                })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        id: '186620b3-a831-440d-a4c7-f0ebc90b9d89',
                        name: 'updated.title',
                    });
                });
        });

        it('should delete an appointment status', async () => {
            await request(app.getHttpServer())
                .delete('/appointment-statuses/186620b3-a831-440d-a4c7-f0ebc90b9d89')
                // .auth(token, { type: 'bearer' })
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/appointment-statuses/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                // .auth(token, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'Not Found',
                            path: '/appointment-statuses/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/appointment-statuses/undefined')
                // .auth(token, { type: 'bearer' })
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
