import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import { getTestingModule } from '../../core/testing';
import request from 'supertest';
import { CreatePracticianDto } from '../dtos/create-practician.dto';
import { UpdatePracticianDto } from '../dtos/update-practician.dto';
import { JwtService } from '@nestjs/jwt';

describe('PracticianController', () => {
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

        execSync('make regenerate-db-test');
        await app.init();
    });

    afterAll(async () => {
        if (app) await app.close();
    });

    describe('/', () => {
        it('should get practicians', async () => {
            await request(app.getHttpServer())
                .get('/practicians')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        result: {
                            data: [
                                {
                                    id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    user: {
                                        id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                        email: 'practician@keneyasira.com',
                                        firstName: 'Doctor',
                                        lastName: 'Doctor',
                                        phone: '+22379131415',
                                    },
                                },
                            ],
                            total: 1,
                        },
                        statusCode: 200,
                    });
                });
        });
        it('should get a practician', async () => {
            await request(app.getHttpServer())
                .get('/practicians/18f33b4c-6f7c-4af7-8d0f-3c50aab951ac')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        result: {
                            data: [
                                {
                                    id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    user: {
                                        id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                        email: 'practician@keneyasira.com',
                                        firstName: 'Practician',
                                        lastName: 'Practician',
                                        phone: '5551234567',
                                    },
                                },
                            ],
                            total: 1,
                        },
                        statusCode: 200,
                    });
                });
        });
        it('should create a practician', async () => {
            const practician: CreatePracticianDto = {
                email: 'docteur@practician.com',
                lastName: 'lastName',
                firstName: 'firstName',
                phone: '0022379131510',
            };

            await request(app.getHttpServer())
                .post('/practicians')
                .auth(accessToken, { type: 'bearer' })
                .send(practician)
                .expect(201)
                .expect(({ body }) => {
                    expect(body.user).toMatchObject({
                        id: expect.any(String),
                        userId: expect.any(String),
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        updatedBy: '',
                        createdAt: expect.any(Date),
                        updatedAt: '',
                        user: {
                            id: expect.any(String),
                            email: 'docteur@practician.com',
                            firstName: practician.firstName,
                            lastName: practician.lastName,
                            phone: practician.phone,
                        },
                    });
                });
        });
        it('should update a practician', async () => {
            const updatePayload: UpdatePracticianDto = {
                id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                email: 'update@practician.com',
                lastName: 'updateName',
                firstName: 'updateName',
                phone: '0022389131410',
            };

            const userId = 'd4581754-69b2-4414-9e9c-4a17fb2022c2';

            await request(app.getHttpServer())
                .put(`/practicians/${updatePayload.id}`)
                .auth(accessToken, { type: 'bearer' })
                .send(updatePayload)
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        id: updatePayload.id,
                        userId,
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        user: {
                            ...updatePayload,
                        },
                    });
                });
        });
        it('should delete a practician', async () => {
            await request(app.getHttpServer())
                .delete(`/practicians/18f33b4c-6f7c-4af7-8d0f-3c50aab951ac`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/practicians/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                .auth(accessToken, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            error: 'Not Found',
                            message: 'Practician not found',
                            path: '/practicians/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });
        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/practicians/undefined')
                .auth(accessToken, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/practicians/undefined',
                        }),
                    });
                });
        });

        it('should return "Conflict" when trying to create a practician with an email which already exists', async () => {
            const practician: CreatePracticianDto = {
                email: 'docteur@practician.com',
                lastName: 'lastName',
                firstName: 'firstName',
                phone: '0022389131410',
            };

            await request(app.getHttpServer())
                .post('/practicians')
                .auth(accessToken, { type: 'bearer' })
                .send(practician)
                .expect(409)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 409,
                            error: 'Conflict',
                            message: 'User already exists with the same email',
                            path: '/practicians',
                            payload: {
                                email: 'docteur@practician.com',
                                firstName: 'firstName',
                                lastName: 'lastName',
                                phone: '0022389131410',
                            },
                        }),
                    });
                });
        });
    });
});
