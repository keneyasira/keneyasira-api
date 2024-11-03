import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';

describe('PatientController', () => {
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
        it('should get patients', async () => {
            return request(app.getHttpServer())
                .get('/patients/')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                birthDate: '1999-01-01',
                                createdBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                id: '632273cc-de99-4582-a440-752ba1f78766',
                                updatedBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                deletedAt: null,
                                deletedBy: null,
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: expect.any(String),
                                user: {
                                    createdBy: null,
                                    email: 'patient@keneyasira.com',
                                    firstName: 'Patient',
                                    id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                    lastName: 'Patient',
                                    phone: '+22379131416',
                                    updatedBy: null,
                                    deletedAt: null,
                                    deletedBy: null,
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    updatedAt: expect.any(String),
                                },
                                userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                            },
                        ],
                        total: 1,
                        statusCode: 200,
                    });
                });
        });

        it('should get a patient', async () => {
            return request(app.getHttpServer())
                .get('/patients/632273cc-de99-4582-a440-752ba1f78766')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: {
                            birthDate: '1999-01-01',
                            createdBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                            id: '632273cc-de99-4582-a440-752ba1f78766',
                            updatedBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                            deletedAt: null,
                            deletedBy: null,
                            createdAt: '2024-05-20T23:13:00.000Z',
                            updatedAt: expect.any(String),
                            user: {
                                createdBy: null,
                                email: 'patient@keneyasira.com',
                                firstName: 'Patient',
                                id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                lastName: 'Patient',
                                phone: '+22379131416',
                                updatedBy: null,
                                deletedAt: null,
                                deletedBy: null,
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: expect.any(String),
                            },
                            userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                        },
                        statusCode: 200,
                    });
                });
        });

        it('should create a patient', async () => {
            const newDate = new Date().toISOString();
            return request(app.getHttpServer())
                .post('/patients')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    birthDate: newDate,
                    email: 'createdpatient@keneyasira.com',
                    firstName: 'Patient',
                    lastName: 'Patient',
                    phone: '+22379131419',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        data: {
                            id: expect.any(String),
                            birthDate: expect.any(String),
                            deletedAt: null,
                            deletedBy: null,
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                            user: {
                                createdBy: null,
                                email: 'createdpatient@keneyasira.com',
                                firstName: 'Patient',
                                id: expect.any(String),
                                lastName: 'Patient',
                                phone: '+22379131419',
                                updatedBy: null,
                                deletedAt: null,
                                deletedBy: null,
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                            },
                            userId: expect.any(String),
                        },
                        statusCode: 201,
                    });
                });
        });

        it('should update a patient', async () => {
            return request(app.getHttpServer())
                .put('/patients/632273cc-de99-4582-a440-752ba1f78766')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    id: '632273cc-de99-4582-a440-752ba1f78766',
                    birthDate: '2000-05-05',
                })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: {
                            birthDate: '2000-05-05',
                            createdBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                            id: '632273cc-de99-4582-a440-752ba1f78766',
                            updatedBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                            deletedAt: null,
                            deletedBy: null,
                            createdAt: '2024-05-20T23:13:00.000Z',
                            updatedAt: expect.any(String),
                            user: {
                                createdBy: null,
                                email: 'patient@keneyasira.com',
                                firstName: 'Patient',
                                id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                lastName: 'Patient',
                                phone: '+22379131416',
                                updatedBy: null,
                                deletedAt: null,
                                deletedBy: null,
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: expect.any(String),
                            },
                            userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                        },
                        statusCode: 200,
                    });
                });
        });

        it('should delete a patient', async () => {
            return request(app.getHttpServer())
                .delete('/patients/632273cc-de99-4582-a440-752ba1f78766')
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/patients/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                .auth(accessToken, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            error: 'Not Found',
                            message: 'Patient not found',
                            path: '/patients/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/patients/undefined')
                .auth(accessToken, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/patients/undefined',
                        }),
                    });
                });
        });

        it.skip('should return conflict when trying to create a patient with existing phone number', () => {});
        it.skip('should return conflict when trying to create a patient with existing email', () => {});
    });
});
