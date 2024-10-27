import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import { UpdateTimeSlotDto } from '../dtos/update-time-slot.dto';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';

describe('TimeSlotController', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let accessToken: string;

    beforeEach(async () => {
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
        it('should get time slots', async () => {
            await request(app.getHttpServer())
                .get('/time-slots')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    console.log(JSON.stringify(body, null, 2));
                    expect(body).toEqual({
                        statusCode: 200,
                        data: [
                            {
                                id: '091f0895-91c6-4fd0-b638-5db2dd933539',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                available: false,
                                startDate: '2024-10-24T00:00:00.000Z',
                                endDate: '2024-10-24T01:00:00.000Z',
                                establishment: {
                                    id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    name: 'Point G',
                                    address: 'Rue Kati, Bamako, Mali',
                                    phone: '+22379131419',
                                    city: 'Bamako',
                                    country: 'Mali',
                                },
                                practician: {
                                    id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    user: {
                                        id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                        email: 'practician@keneyasira.com',
                                        firstName: 'Doctor',
                                        lastName: 'Doctor',
                                        phone: '+22379131415',
                                        createdBy: null,
                                        updatedBy: null,
                                    },
                                },
                            },
                            {
                                id: '4b42301e-0108-46f2-a721-e01dc8c359d2',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                available: true,
                                startDate: '2024-10-24T01:00:00.000Z',
                                endDate: '2024-10-24T01:30:00.000Z',
                                establishment: {
                                    id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    name: 'Point G',
                                    address: 'Rue Kati, Bamako, Mali',
                                    phone: '+22379131419',
                                    city: 'Bamako',
                                    country: 'Mali',
                                },
                                practician: {
                                    id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    user: {
                                        id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                        email: 'practician@keneyasira.com',
                                        firstName: 'Doctor',
                                        lastName: 'Doctor',
                                        phone: '+22379131415',
                                        createdBy: null,
                                        updatedBy: null,
                                    },
                                },
                            },
                            {
                                id: '56c63078-c32f-4d04-aa96-5e7815de1f98',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                available: false,
                                startDate: '2024-10-24T01:30:00.000Z',
                                endDate: '2024-10-24T02:30:00.000Z',
                                establishment: {
                                    id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    name: 'Point G',
                                    address: 'Rue Kati, Bamako, Mali',
                                    phone: '+22379131419',
                                    city: 'Bamako',
                                    country: 'Mali',
                                },
                                practician: {
                                    id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    user: {
                                        id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                        email: 'practician@keneyasira.com',
                                        firstName: 'Doctor',
                                        lastName: 'Doctor',
                                        phone: '+22379131415',
                                        createdBy: null,
                                        updatedBy: null,
                                    },
                                },
                            },
                            {
                                id: '6a2cb23b-2882-4a02-81c9-ac2d9c72775f',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                available: true,
                                startDate: '2024-10-24T01:30:00.000Z',
                                endDate: '2024-10-24T02:30:00.000Z',
                                establishment: {
                                    id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    name: 'Point G',
                                    address: 'Rue Kati, Bamako, Mali',
                                    phone: '+22379131419',
                                    city: 'Bamako',
                                    country: 'Mali',
                                },
                                practician: {
                                    id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    user: {
                                        id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                        email: 'practician@keneyasira.com',
                                        firstName: 'Doctor',
                                        lastName: 'Doctor',
                                        phone: '+22379131415',
                                        createdBy: null,
                                        updatedBy: null,
                                    },
                                },
                            },
                        ],
                        total: 4,
                    });
                });
        });

        it('should get a time slot', async () => {
            await request(app.getHttpServer())
                .get(`/time-slots/091f0895-91c6-4fd0-b638-5db2dd933539`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                available: false,
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                endDate: '2024-10-24T01:00:00.000Z',
                                establishment: {
                                    address: 'Rue Kati, Bamako, Mali',
                                    city: 'Bamako',
                                    country: 'Mali',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                    name: 'Point G',
                                    phone: '+22379131419',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                },
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                id: '091f0895-91c6-4fd0-b638-5db2dd933539',
                                practician: {
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    user: {
                                        createdBy: null,
                                        email: 'practician@keneyasira.com',
                                        firstName: 'Doctor',
                                        id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                        lastName: 'Doctor',
                                        phone: '+22379131415',
                                        updatedBy: null,
                                    },
                                    userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                },
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                startDate: '2024-10-24T00:00:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                        ],
                        statusCode: 200,
                    });
                });
        });

        it('should create a time slot', async () => {
            await request(app.getHttpServer())
                .post('/time-slots')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    available: true,
                    startDate: new Date().toISOString(),
                    endDate: new Date().toISOString(),
                    practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                    establishmentId: '90b93a53-4109-4182-aa28-d4f3af0b87bb',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                available: true,
                                createdBy: null,
                                endDate: '2024-10-24T02:54:14.760Z',
                                establishment: {
                                    address: 'Av. Van Vollenhoven, Bamako, Mali',
                                    city: 'Bamako',
                                    country: 'Mali',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    id: '90b93a53-4109-4182-aa28-d4f3af0b87bb',
                                    name: 'Gabriel Toure',
                                    phone: '+22379131418',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                },
                                establishmentId: '90b93a53-4109-4182-aa28-d4f3af0b87bb',
                                id: 'c6ab34f7-7576-42b3-afff-98175e6b8a74',
                                practician: null,
                                practicianId: null,
                                startDate: '2024-10-24T02:54:14.760Z',
                                updatedBy: null,
                            },
                        ],
                        statusCode: 201,
                    });
                });
        });

        it('should update a time slot', async () => {
            const updateDto: UpdateTimeSlotDto = {
                id: '091f0895-91c6-4fd0-b638-5db2dd933539',
                available: true,
            };

            await request(app.getHttpServer())
                .put(`/time-slots/${updateDto.id}`)
                .auth(accessToken, { type: 'bearer' })
                .send(updateDto)
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                available: true,
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                endDate: '2024-10-24T01:00:00.000Z',
                                establishment: {
                                    address: 'Rue Kati, Bamako, Mali',
                                    city: 'Bamako',
                                    country: 'Mali',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                    name: 'Point G',
                                    phone: '+22379131419',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                },
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                id: '091f0895-91c6-4fd0-b638-5db2dd933539',
                                practician: {
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    user: {
                                        createdBy: null,
                                        email: 'practician@keneyasira.com',
                                        firstName: 'Doctor',
                                        id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                        lastName: 'Doctor',
                                        phone: '+22379131415',
                                        updatedBy: null,
                                    },
                                    userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                },
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                startDate: '2024-10-24T00:00:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                        ],
                        statusCode: 200,
                    });
                });
        });

        it('should delete a time slot', async () => {
            await request(app.getHttpServer())
                .delete(`/time-slots/091f0895-91c6-4fd0-b638-5db2dd933539`)
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/time-slots/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                .auth(accessToken, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            error: 'Not Found',
                            message: 'TimeSlot not found',
                            path: '/time-slots/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });
        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/time-slots/undefined')
                .auth(accessToken, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/time-slots/undefined',
                        }),
                    });
                });
        });
    });
});
