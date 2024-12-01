import { INestApplication } from '@nestjs/common';
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
            clientType: 'admin',
        });

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
                        data: [
                            {
                                id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                                user: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: null,
                                    id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    email: 'practician@keneyasira.com',
                                    firstName: 'Doctor',
                                    lastName: 'Doctor',
                                    phone: '+22379131415',
                                    updatedBy: null,
                                    deletedAt: null,
                                    deletedBy: null,
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                },
                            },
                        ],
                        statusCode: 200,
                        total: 1,
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
                        data: {
                            id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            createdAt: '2024-05-20T23:13:00.000Z',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            deletedAt: null,
                            deletedBy: null,
                            user: {
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: null,
                                id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                email: 'practician@keneyasira.com',
                                firstName: 'Doctor',
                                lastName: 'Doctor',
                                phone: '+22379131415',
                                updatedBy: null,
                                deletedAt: null,
                                deletedBy: null,
                                updatedAt: '2024-05-20T23:13:00.000Z',
                            },
                        },
                        statusCode: 200,
                    });
                });
        });

        it('should search practicians by firstName', async () => {
            await request(app.getHttpServer())
                .get('/practicians?firstName=Doctor')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                                user: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: null,
                                    id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    email: 'practician@keneyasira.com',
                                    firstName: 'Doctor',
                                    lastName: 'Doctor',
                                    phone: '+22379131415',
                                    updatedBy: null,
                                    deletedAt: null,
                                    deletedBy: null,
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                },
                            },
                        ],
                        statusCode: 200,
                        total: 1,
                    });
                });
        });

        it('should search practicians by lastName', async () => {
            await request(app.getHttpServer())
                .get('/practicians?lastName=Doctor')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                                user: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: null,
                                    id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    email: 'practician@keneyasira.com',
                                    firstName: 'Doctor',
                                    lastName: 'Doctor',
                                    phone: '+22379131415',
                                    updatedBy: null,
                                    deletedAt: null,
                                    deletedBy: null,
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                },
                            },
                        ],
                        statusCode: 200,
                        total: 1,
                    });
                });
        });

        it('should search practicians by email', async () => {
            await request(app.getHttpServer())
                .get('/practicians?email=practician@keneyasira.com')
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
                                id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                user: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: null,
                                    deletedAt: null,
                                    deletedBy: null,
                                    email: 'practician@keneyasira.com',
                                    firstName: 'Doctor',
                                    id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    lastName: 'Doctor',
                                    phone: '+22379131415',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    updatedBy: null,
                                },
                                userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                            },
                        ],
                        statusCode: 200,
                        total: 1,
                    });
                });
        });

        it('should search practicians by phone', async () => {
            await request(app.getHttpServer())
                .get('/practicians?phone=+22379131415')
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
                                id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                user: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: null,
                                    deletedAt: null,
                                    deletedBy: null,
                                    email: 'practician@keneyasira.com',
                                    firstName: 'Doctor',
                                    id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    lastName: 'Doctor',
                                    phone: '+22379131415',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    updatedBy: null,
                                },
                                userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                            },
                        ],
                        statusCode: 200,
                        total: 1,
                    });
                });
        });
        it('should create a practician', async () => {
            const practician: CreatePracticianDto = {
                email: 'create@practician.com',
                lastName: 'lastName',
                firstName: 'firstName',
                phone: '0022379131519',
            };

            const id = await request(app.getHttpServer())
                .post('/practicians')
                .auth(accessToken, { type: 'bearer' })
                .send(practician)
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        data: {
                            id: expect.any(String),
                            userId: expect.any(String),
                            createdBy: null,
                            updatedBy: null,
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                            deletedAt: null,
                            deletedBy: null,
                            user: {
                                id: expect.any(String),
                                email: 'create@practician.com',
                                firstName: practician.firstName,
                                lastName: practician.lastName,
                                phone: practician.phone,
                                deletedAt: null,
                                deletedBy: null,
                            },
                        },

                        statusCode: 201,
                    });
                })
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .delete(`/practicians/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });
        it('should update a practician', async () => {
            const practician: CreatePracticianDto = {
                email: 'docteur1@practician.com',
                lastName: 'lastName',
                firstName: 'firstName',
                phone: '0022379151510',
            };

            const id = await request(app.getHttpServer())
                .post('/practicians')
                .auth(accessToken, { type: 'bearer' })
                .send(practician)
                .expect(201)
                .then(({ body }) => body.data.id);

            const updatePayload: UpdatePracticianDto = {
                id,
                email: 'update@practician.com',
                lastName: 'updateName',
                firstName: 'updateName',
                phone: '0022389151410',
            };

            await request(app.getHttpServer())
                .put(`/practicians/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .send(updatePayload)
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        data: {
                            createdBy: null,
                            id,
                            updatedBy: null,
                            user: {
                                createdBy: null,
                                email: 'update@practician.com',
                                firstName: 'updateName',
                                id: expect.any(String),
                                lastName: 'updateName',
                                phone: '0022389151410',
                                updatedBy: null,
                            },
                            userId: expect.any(String),
                        },

                        statusCode: 200,
                    });
                });

            await request(app.getHttpServer())
                .delete(`/practicians/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });
        it('should delete a practician', async () => {
            const practician: CreatePracticianDto = {
                email: 'docteur2@practician.com',
                lastName: 'lastName',
                firstName: 'firstName',
                phone: '0022379131517',
            };

            const id = await request(app.getHttpServer())
                .post('/practicians')
                .auth(accessToken, { type: 'bearer' })
                .send(practician)
                .expect(201)
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .delete(`/practicians/${id}`)
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
                email: 'practician@keneyasira.com',
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
                            message: 'User already exists with the same email or phone',
                            path: '/practicians',
                            payload: {
                                email: 'practician@keneyasira.com',
                                firstName: 'firstName',
                                lastName: 'lastName',
                                phone: '0022389131410',
                            },
                        }),
                    });
                });
        });

        it('should return "Conflict" when trying to create a practician with a phone number which already exists', async () => {
            const practician: CreatePracticianDto = {
                email: 'docteur3@practician.com',
                lastName: 'lastName',
                firstName: 'firstName',
                phone: '+22379131415',
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
                            message: 'User already exists with the same email or phone',
                            path: '/practicians',
                            payload: {
                                email: 'docteur3@practician.com',
                                firstName: 'firstName',
                                lastName: 'lastName',
                                phone: '+22379131415',
                            },
                        }),
                    });
                });
        });

        it('should search practicians by specialty', async () => {
            await request(app.getHttpServer())
                .get('/practicians?specialty=Dermatology')
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
                                id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                specialties: [
                                    {
                                        PracticianHasSpecialty: {
                                            createdAt: '2024-05-20T23:13:00.000Z',
                                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                            deletedAt: null,
                                            deletedBy: null,
                                            id: '8112162c-e0a2-4f6f-a2c6-14aa72f6bab0',
                                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                            specialtyId: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                                            updatedAt: '2024-05-20T23:13:00.000Z',
                                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                        },
                                        createdAt: '2024-05-20T23:13:00.000Z',
                                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                        deletedAt: null,
                                        deletedBy: null,
                                        id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                                        name: 'Dermatology',
                                        updatedAt: '2024-05-20T23:13:00.000Z',
                                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    },
                                ],
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                user: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: null,
                                    deletedAt: null,
                                    deletedBy: null,
                                    email: 'practician@keneyasira.com',
                                    firstName: 'Doctor',
                                    id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    lastName: 'Doctor',
                                    phone: '+22379131415',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    updatedBy: null,
                                },
                                userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                            },
                        ],
                        statusCode: 200,
                        total: 1,
                    });
                });
        });

        it('should return empty array when searching for non-existent specialty', async () => {
            await request(app.getHttpServer())
                .get('/practicians?specialty=NonExistentSpecialty')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body.data).toEqual([]);
                    expect(body.total).toBe(0);
                });
        });

        it('GET /:id/establishments/:establishmentId/time-slots should return array of timeslots for establishment', async () => {
            const establishmentId = 'f211f711-0e57-4c30-bbf2-7c9f576de879';
            const practicianId = '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac';
            await request(app.getHttpServer())
                .get(`/practicians/${practicianId}/establishments/${establishmentId}/time-slots`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body.data).toEqual([
                        {
                            available: expect.any(Boolean),
                            createdAt: '2024-05-20T23:13:04.000Z',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            date: '2024-12-01',
                            deletedAt: null,
                            deletedBy: null,
                            endTime: '02:30:00',
                            establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            id: '6a2cb23b-2882-4a02-81c9-ac2d9c72775f',
                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            startTime: '01:30:00',
                            updatedAt: expect.any(String),
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                        {
                            available: false,
                            createdAt: '2024-05-20T23:13:03.000Z',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            date: '2024-12-01',
                            deletedAt: null,
                            deletedBy: null,
                            endTime: '02:30:00',
                            establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            id: '56c63078-c32f-4d04-aa96-5e7815de1f98',
                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            startTime: '01:30:00',
                            updatedAt: expect.any(String),
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                        {
                            available: false,
                            createdAt: '2024-05-20T23:13:02.000Z',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            date: '2024-12-01',
                            deletedAt: null,
                            deletedBy: null,
                            endTime: '01:30:00',
                            establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            id: '4b42301e-0108-46f2-a721-e01dc8c359d2',
                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            startTime: '01:00:00',
                            updatedAt: expect.any(String),
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                        {
                            available: false,
                            createdAt: '2024-05-20T23:13:01.000Z',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            date: '2024-12-01',
                            deletedAt: null,
                            deletedBy: null,
                            endTime: '01:00:00',
                            establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            id: '091f0895-91c6-4fd0-b638-5db2dd933539',
                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            startTime: '00:00:00',
                            updatedAt: expect.any(String),
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                    ]);
                    expect(body.total).toBe(4);
                });
        });

        it('GET /:id/establishments/:establishmentId/appointments should return array of appointments for establishment', async () => {
            const establishmentId = 'f211f711-0e57-4c30-bbf2-7c9f576de879';
            const practicianId = '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac';

            await request(app.getHttpServer())
                .get(`/practicians/${practicianId}/establishments/${establishmentId}/appointments`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    // expect(body.data).toEqual([]);
                    expect(body.total).toBe(4);
                });
        });
    });
});
