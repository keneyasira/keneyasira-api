import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';

describe('PatientController', () => {
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
        it('should get patients', async () => {
            return (
                request(app.getHttpServer())
                    .get('/patient/')
                    // .auth(token, { type: 'bearer' })
                    .expect(200)
                    .expect(({ body }) => {
                        expect(body).toEqual({
                            data: [
                                {
                                    birthDate: '1999-01-01',
                                    createdBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                    id: '632273cc-de99-4582-a440-752ba1f78766',
                                    updatedBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                    user: {
                                        createdBy: null,
                                        email: 'patient@keneyasira.com',
                                        firstName: 'Patient',
                                        id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                        lastName: 'Patient',
                                        phone: '5551234567',
                                        updatedBy: null,
                                    },
                                    userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                },
                            ],
                            total: 1,
                        });
                    })
            );
        });

        it('should get a patient', async () => {
            return (
                request(app.getHttpServer())
                    .get('/patient/632273cc-de99-4582-a440-752ba1f78766')
                    // .auth(token, { type: 'bearer' })
                    .expect(200)
                    .expect(({ body }) => {
                        expect(body).toEqual({
                            birthDate: '1999-01-01',
                            createdBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                            id: '632273cc-de99-4582-a440-752ba1f78766',
                            updatedBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                            user: {
                                createdBy: null,
                                email: 'patient@keneyasira.com',
                                firstName: 'Patient',
                                id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                lastName: 'Patient',
                                phone: '5551234567',
                                updatedBy: null,
                            },
                            userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                        });
                    })
            );
        });

        it('should create a patient', async () => {
            return (
                request(app.getHttpServer())
                    .post('/patient')
                    // .auth(token, { type: 'bearer' })
                    .send({
                        userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                        birthDate: '2000-05-05',
                    })
                    .expect(201)
                    .expect(({ body }) => {
                        expect(body).toMatchObject({
                            birthDate: '2000-05-05',
                            user: {
                                createdBy: null,
                                email: 'practician@keneyasira.com',
                                firstName: 'Doctor',
                                id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                lastName: 'Doctor',
                                phone: '9876543210',
                                updatedBy: null,
                            },
                            userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                        });
                    })
            );
        });

        it('should update a patient', async () => {
            return (
                request(app.getHttpServer())
                    .put('/patient/632273cc-de99-4582-a440-752ba1f78766')
                    // .auth(token, { type: 'bearer' })
                    .send({
                        id: '632273cc-de99-4582-a440-752ba1f78766',
                        birthDate: '2000-05-05',
                    })
                    .expect(200)
                    .expect(({ body }) => {
                        expect(body).toEqual({
                            birthDate: '2000-05-05',
                            createdBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                            id: '632273cc-de99-4582-a440-752ba1f78766',
                            updatedBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                            user: {
                                createdBy: null,
                                email: 'patient@keneyasira.com',
                                firstName: 'Patient',
                                id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                lastName: 'Patient',
                                phone: '5551234567',
                                updatedBy: null,
                            },
                            userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                        });
                    })
            );
        });

        it('should delete a patient', async () => {
            return (
                request(app.getHttpServer())
                    .delete('/patient/632273cc-de99-4582-a440-752ba1f78766')
                    // .auth(token, { type: 'bearer' })
                    .expect(200)
            );
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/patient/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                // .auth(token, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'Not Found',
                            path: '/patient/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/patient/undefined')
                // .auth(token, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/patient/undefined',
                        }),
                    });
                });
        });
    });
});
