import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { JwtService } from '@nestjs/jwt';
import { getTestingModule } from '../../core/testing';
import { CreateAppointmentDto } from '../dtos/create-appointment.dto';

describe('AppointmentController', () => {
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
        it('should get appointments', async () => {
            await request(app.getHttpServer())
                .get('/appointments')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                appointmentStatusId: '186620b3-a831-440d-a4c7-f0ebc90b9d89',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                                establishment: {
                                    address: 'Rue Kati, Bamako, Mali',
                                    city: 'Bamako',
                                    country: 'Mali',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    description: '',
                                    id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                    name: 'Point G',
                                    phone: '+22379131419',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    deletedAt: null,
                                    deletedBy: null,
                                },
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                id: '12de8a17-686b-41b4-a1af-53e512ca957c',
                                patient: {
                                    birthDate: '1999-01-01',
                                    createdBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                    id: '632273cc-de99-4582-a440-752ba1f78766',
                                    updatedBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    deletedAt: null,
                                    deletedBy: null,
                                    user: {
                                        createdAt: '2024-05-20T23:13:00.000Z',
                                        createdBy: null,
                                        email: 'patient@keneyasira.com',
                                        firstName: 'Patient',
                                        id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                        lastName: 'Patient',
                                        phone: '+22379131416',
                                        updatedAt: '2024-05-20T23:13:00.000Z',
                                        updatedBy: null,
                                        deletedAt: null,
                                        deletedBy: null,
                                    },
                                    userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                },
                                patientId: '632273cc-de99-4582-a440-752ba1f78766',
                                practician: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    deletedAt: null,
                                    deletedBy: null,
                                    user: {
                                        createdAt: '2024-05-20T23:13:00.000Z',
                                        createdBy: null,
                                        email: 'practician@keneyasira.com',
                                        firstName: 'Doctor',
                                        id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                        lastName: 'Doctor',
                                        phone: '+22379131415',
                                        updatedAt: '2024-05-20T23:13:00.000Z',
                                        updatedBy: null,
                                        deletedAt: null,
                                        deletedBy: null,
                                    },
                                    userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                },
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                timeSlotId: '091f0895-91c6-4fd0-b638-5db2dd933539',
                                timeslot: {
                                    available: false,
                                    establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                    id: '091f0895-91c6-4fd0-b638-5db2dd933539',
                                    practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    date: expect.any(String),
                                    startTime: expect.any(String),
                                    endTime: expect.any(String),
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedAt: expect.any(String),
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    deletedAt: null,
                                    deletedBy: null,
                                },
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                            },
                            {
                                appointmentStatusId: 'cc265f80-e8af-4539-bfc2-e83d5cc4f8d3',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
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
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                },
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                id: '65fc7aa4-6295-49c5-95c0-fb3bcbeaa270',
                                patient: {
                                    birthDate: '1999-01-01',
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                    deletedAt: null,
                                    deletedBy: null,
                                    id: '632273cc-de99-4582-a440-752ba1f78766',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    updatedBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                    user: {
                                        createdAt: '2024-05-20T23:13:00.000Z',
                                        createdBy: null,
                                        deletedAt: null,
                                        deletedBy: null,
                                        email: 'patient@keneyasira.com',
                                        firstName: 'Patient',
                                        id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                        lastName: 'Patient',
                                        phone: '+22379131416',
                                        updatedBy: null,
                                        updatedAt: '2024-05-20T23:13:00.000Z',
                                    },
                                    userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                },
                                patientId: '632273cc-de99-4582-a440-752ba1f78766',
                                practician: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    deletedAt: null,
                                    deletedBy: null,
                                    id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
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
                                        updatedBy: null,
                                        updatedAt: '2024-05-20T23:13:00.000Z',
                                    },
                                    userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                },
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                timeSlotId: '4b42301e-0108-46f2-a721-e01dc8c359d2',
                                timeslot: {
                                    available: false,
                                    establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                    id: '4b42301e-0108-46f2-a721-e01dc8c359d2',
                                    practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    date: expect.any(String),
                                    startTime: expect.any(String),
                                    endTime: expect.any(String),
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    deletedAt: null,
                                    deletedBy: null,
                                },
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                            },
                            {
                                appointmentStatusId: '665b47d5-5ec3-4199-b3f1-87a9aa71d9e6',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
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
                                id: '5d9934de-c5c8-453f-a75d-ece7994dc1f4',
                                patient: {
                                    birthDate: '1999-01-01',
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                    deletedAt: null,
                                    deletedBy: null,
                                    id: '632273cc-de99-4582-a440-752ba1f78766',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    updatedBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                    user: {
                                        createdAt: '2024-05-20T23:13:00.000Z',
                                        createdBy: null,
                                        deletedAt: null,
                                        deletedBy: null,
                                        email: 'patient@keneyasira.com',
                                        firstName: 'Patient',
                                        id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                        lastName: 'Patient',
                                        phone: '+22379131416',
                                        updatedAt: '2024-05-20T23:13:00.000Z',
                                        updatedBy: null,
                                    },
                                    userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                },
                                patientId: '632273cc-de99-4582-a440-752ba1f78766',
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
                                timeSlotId: '56c63078-c32f-4d04-aa96-5e7815de1f98',
                                timeslot: {
                                    available: false,
                                    establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                    id: '56c63078-c32f-4d04-aa96-5e7815de1f98',
                                    practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                    date: expect.any(String),
                                    startTime: expect.any(String),
                                    endTime: expect.any(String),
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    deletedAt: null,
                                    deletedBy: null,
                                },
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                        ],
                        statusCode: 200,
                        total: 3,
                    });
                });
        });

        it('should get appointment by id', async () => {
            await request(app.getHttpServer())
                .get('/appointments/12de8a17-686b-41b4-a1af-53e512ca957c')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: {
                            appointmentStatusId: '186620b3-a831-440d-a4c7-f0ebc90b9d89',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            createdAt: '2024-05-20T23:13:00.000Z',
                            deletedAt: null,
                            deletedBy: null,
                            establishment: {
                                address: 'Rue Kati, Bamako, Mali',
                                city: 'Bamako',
                                country: 'Mali',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                name: 'Point G',
                                description: '',
                                phone: '+22379131419',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                            },
                            establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            id: '12de8a17-686b-41b4-a1af-53e512ca957c',
                            patient: {
                                birthDate: '1999-01-01',
                                createdBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                id: '632273cc-de99-4582-a440-752ba1f78766',
                                updatedBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                                user: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: null,
                                    email: 'patient@keneyasira.com',
                                    firstName: 'Patient',
                                    id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                    lastName: 'Patient',
                                    phone: '+22379131416',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    updatedBy: null,
                                    deletedAt: null,
                                    deletedBy: null,
                                },
                                userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                            },
                            patientId: '632273cc-de99-4582-a440-752ba1f78766',
                            practician: {
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                deletedAt: null,
                                deletedBy: null,
                                user: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: null,
                                    email: 'practician@keneyasira.com',
                                    firstName: 'Doctor',
                                    id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    lastName: 'Doctor',
                                    phone: '+22379131415',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    updatedBy: null,
                                    deletedAt: null,
                                    deletedBy: null,
                                },
                                userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                            },
                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            timeSlotId: '091f0895-91c6-4fd0-b638-5db2dd933539',
                            timeslot: {
                                available: false,
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                id: '091f0895-91c6-4fd0-b638-5db2dd933539',
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                date: expect.any(String),
                                startTime: '00:00:00',
                                endTime: '01:00:00',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                updatedAt: expect.any(String),
                                deletedAt: null,
                                deletedBy: null,
                            },
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                        statusCode: 200,
                    });
                });
        });

        it('should create appointment with scheduled status', async () => {
            const createAppointmentDto: CreateAppointmentDto = {
                patientId: '632273cc-de99-4582-a440-752ba1f78766',
                timeSlotId: '6a2cb23b-2882-4a02-81c9-ac2d9c72775f',
            };

            await request(app.getHttpServer())
                .post('/appointments')
                .auth(accessToken, { type: 'bearer' })
                .send(createAppointmentDto)
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: {
                            appointmentStatusId: '186620b3-a831-440d-a4c7-f0ebc90b9d89',
                            createdAt: expect.any(String),
                            createdBy: null,
                            deletedAt: null,
                            deletedBy: null,
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
                            id: expect.any(String),
                            patient: {
                                birthDate: '1999-01-01',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                deletedAt: null,
                                deletedBy: null,
                                id: '632273cc-de99-4582-a440-752ba1f78766',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                user: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: null,
                                    deletedAt: null,
                                    deletedBy: null,
                                    email: 'patient@keneyasira.com',
                                    firstName: 'Patient',
                                    id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                    lastName: 'Patient',
                                    phone: '+22379131416',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    updatedBy: null,
                                },
                                userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                            },
                            patientId: '632273cc-de99-4582-a440-752ba1f78766',
                            practician: {
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                                id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                user: {
                                    email: 'practician@keneyasira.com',
                                    firstName: 'Doctor',
                                    id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                    lastName: 'Doctor',
                                    phone: '+22379131415',
                                    updatedAt: '2024-05-20T23:13:00.000Z',
                                    updatedBy: null,
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: null,
                                    deletedAt: null,
                                    deletedBy: null,
                                },
                                userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                            },
                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            timeSlotId: '6a2cb23b-2882-4a02-81c9-ac2d9c72775f',
                            timeslot: {
                                available: true,
                                establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                id: '6a2cb23b-2882-4a02-81c9-ac2d9c72775f',
                                practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                date: expect.any(String),
                                startTime: '01:30:00',
                                endTime: '02:30:00',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: '2024-05-20T23:13:00.000Z',
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                deletedAt: null,
                                deletedBy: null,
                            },
                            updatedAt: expect.any(String),
                            updatedBy: null,
                        },
                        statusCode: 201,
                    });
                });
        });

        it.skip('should confirm an appointment', async () => {
            await request(app.getHttpServer())
                .post('/appointments/12de8a17-686b-41b4-a1af-53e512ca957c')
                .auth(accessToken, { type: 'bearer' })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({});
                });
        });

        it.skip('should cancel an appointment', async () => {
            // create new appointment
            await request(app.getHttpServer()).post('/appointments').send({
                establishment_id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                practician_id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                patient_id: '632273cc-de99-4582-a440-752ba1f78766',
                time_slot_id: '6a2cb23b-2882-4a02-81c9-ac2d9c72775f',
            });

            await request(app.getHttpServer())
                .post('/appointments/:id/cancel')
                .auth(accessToken, { type: 'bearer' })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({});
                });
        });

        it.skip('should complete an appointment', async () => {
            // create new appointment to complete
            await request(app.getHttpServer()).post('/appointments').send({
                establishment_id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                practician_id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                patient_id: '632273cc-de99-4582-a440-752ba1f78766',
                time_slot_id: '6a2cb23b-2882-4a02-81c9-ac2d9c72775f',
            });

            await request(app.getHttpServer())
                .post('/appointments/:id/complete')
                .auth(accessToken, { type: 'bearer' })
                .send({})
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({});
                });
        });

        it.skip('should delete an appointment', async () => {
            await request(app.getHttpServer())
                .delete('/appointments/12de8a17-686b-41b4-a1af-53e512ca957c')
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/appointments/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                .auth(accessToken, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: {
                            code: 404,
                            error: 'Not Found',
                            message: 'Appointment not found',
                            path: '/appointments/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        },
                    });
                });
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/appointments/undefined')
                .auth(accessToken, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/appointments/undefined',
                        }),
                    });
                });
        });
    });
});
