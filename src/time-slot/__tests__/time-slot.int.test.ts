import { Body, INestApplication } from '@nestjs/common';
import request from 'supertest';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

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
                    expect(body).toEqual({
                        statusCode: 200,
                        data: [
                            {
                                available: false,
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                                date: expect.any(String),
                                endTime: expect.any(String),
                                startTime: expect.any(String),
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
                                id: '091f0895-91c6-4fd0-b638-5db2dd933539',
                                practician: {
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
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                            {
                                available: false,
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                                date: expect.any(String),
                                endTime: expect.any(String),
                                startTime: expect.any(String),
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
                                id: '4b42301e-0108-46f2-a721-e01dc8c359d2',
                                practician: {
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
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                            {
                                available: false,
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                                date: expect.any(String),
                                endTime: expect.any(String),
                                startTime: expect.any(String),
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
                                id: '56c63078-c32f-4d04-aa96-5e7815de1f98',
                                practician: {
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
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                            {
                                available: true,
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                                date: expect.any(String),
                                endTime: expect.any(String),
                                startTime: expect.any(String),
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
                                id: '6a2cb23b-2882-4a02-81c9-ac2d9c72775f',
                                practician: {
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
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
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
                        data: {
                            available: false,
                            createdAt: '2024-05-20T23:13:00.000Z',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            deletedAt: null,
                            deletedBy: null,
                            date: expect.any(String),
                            endTime: expect.any(String),
                            startTime: expect.any(String),
                            establishment: {
                                address: 'Rue Kati, Bamako, Mali',
                                city: 'Bamako',
                                country: 'Mali',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                description: '',
                                deletedAt: null,
                                deletedBy: null,
                                id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                name: 'Point G',
                                phone: '+22379131419',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                            establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            id: '091f0895-91c6-4fd0-b638-5db2dd933539',
                            practician: {
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
                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },

                        statusCode: 200,
                    });
                });
        });

        it('should create a time slot', async () => {
            const newDate = new Date().toDateString();
            dayjs.extend(customParseFormat);

            // Parse the Date object using Day.js
            const dayjsDate = dayjs(newDate);

            // Format the parsed date to 'yyyy-mm-dd'
            const formattedDate = dayjsDate.format('YYYY-MM-DD');

            await request(app.getHttpServer())
                .post('/time-slots')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    available: true,
                    date: formattedDate,
                    startTime: '12:00',
                    endTime: '13:00',
                    practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                    establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: {
                            available: true,
                            createdAt: expect.any(String),
                            createdBy: null,
                            deletedAt: null,
                            deletedBy: null,
                            date: formattedDate,
                            endTime: '13:00:00',
                            startTime: '12:00:00',
                            establishment: {
                                address: 'Rue Kati, Bamako, Mali',
                                city: 'Bamako',
                                country: 'Mali',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                description: '',
                                deletedAt: null,
                                deletedBy: null,
                                id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                name: 'Point G',
                                phone: '+22379131419',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                            establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            id: expect.any(String),
                            practician: {
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
                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            updatedAt: expect.any(String),
                            updatedBy: null,
                        },

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
                        data: {
                            available: true,
                            createdAt: '2024-05-20T23:13:00.000Z',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            deletedAt: null,
                            deletedBy: null,
                            date: expect.any(String),
                            endTime: expect.any(String),
                            startTime: expect.any(String),
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
                            id: '091f0895-91c6-4fd0-b638-5db2dd933539',
                            practician: {
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
                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            updatedAt: expect.any(String),
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                        statusCode: 200,
                    });
                });

            await request(app.getHttpServer())
                .put(`/time-slots/${updateDto.id}`)
                .auth(accessToken, { type: 'bearer' })
                .send({
                    id: '091f0895-91c6-4fd0-b638-5db2dd933539',
                    available: false,
                })
                .expect(200);
        });

        it('should delete a time slot', async () => {
            const newDate = new Date().toDateString();
            dayjs.extend(customParseFormat);

            // Parse the Date object using Day.js
            const dayjsDate = dayjs(newDate);

            // Format the parsed date to 'yyyy-mm-dd'
            const formattedDate = dayjsDate.format('YYYY-MM-DD');

            const id = await request(app.getHttpServer())
                .post('/time-slots')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    available: true,
                    date: formattedDate,
                    startTime: '12:00',
                    endTime: '13:00',
                    practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                    establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                })
                .expect(201)
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .delete(`/time-slots/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should not create a time slot with a practician that is not associated to the establishment', async () => {
            const newDate = new Date().toISOString();
            await request(app.getHttpServer())
                .post('/time-slots')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    available: true,
                    startDate: newDate,
                    endDate: newDate,
                    practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                    establishmentId: '90b93a53-4109-4182-aa28-d4f3af0b87bb',
                })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            error: 'Bad Request',
                            message: 'Practician does not belong to Establishment',
                            path: '/time-slots',
                        }),
                    });
                });
        });

        it('should not delete a time slot associated with an appointment', async () => {
            await request(app.getHttpServer())
                .delete(`/time-slots/091f0895-91c6-4fd0-b638-5db2dd933539`)
                .auth(accessToken, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            error: 'Bad Request',
                            message: 'Cannot delete timeslot that is associated to appointments',
                            path: '/time-slots/091f0895-91c6-4fd0-b638-5db2dd933539',
                        }),
                    });
                });
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
