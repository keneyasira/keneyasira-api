import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CreateEstablishmentDto } from '../dtos/create-establishment.dto';

import { JwtService } from '@nestjs/jwt';
import { getTestingModule } from '../../core/testing';

describe('EstablishmentController (e2e)', () => {
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
            clientType: 'admin',
        });

        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('/establishments (GET)', async () => {
        await request(app.getHttpServer())
            .get('/establishments')
            .auth(accessToken, { type: 'bearer' })
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual({
                    data: [
                        {
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
                            establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                            establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
                            affiliation: {
                                id: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                                name: 'public',
                            },
                            type: {
                                id: '4d37ada2-8652-4268-b202-0db16fef70ba',
                                name: 'hospital',
                            },
                        },
                        {
                            address: 'Av. Van Vollenhoven, Bamako, Mali',
                            city: 'Bamako',
                            country: 'Mali',
                            createdAt: '2024-05-20T23:13:00.000Z',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            deletedAt: null,
                            deletedBy: null,
                            description: '',
                            id: '90b93a53-4109-4182-aa28-d4f3af0b87bb',
                            name: 'Gabriel Toure',
                            phone: '+22379131418',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                            establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
                            affiliation: {
                                id: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                                name: 'public',
                            },
                            type: {
                                id: '4d37ada2-8652-4268-b202-0db16fef70ba',
                                name: 'hospital',
                            },
                        },
                    ],
                    statusCode: 200,
                    total: 2,
                });
            });
    });

    it('/establishments/:id (GET)', async () => {
        await request(app.getHttpServer())
            .get(`/establishments/f211f711-0e57-4c30-bbf2-7c9f576de879`)
            .auth(accessToken, { type: 'bearer' })
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual({
                    data: {
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
                        establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                        establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
                        specialties: [
                            {
                                id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                                name: 'Dermatology',
                            },
                        ],
                        affiliation: {
                            id: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                            name: 'public',
                        },
                        type: {
                            id: '4d37ada2-8652-4268-b202-0db16fef70ba',
                            name: 'hospital',
                        },
                    },
                    statusCode: 200,
                });
            });
    });

    it('/establishments (POST)', async () => {
        const createEstablishmentDto: CreateEstablishmentDto = {
            name: 'Test Establishment',
            address: '123 Test St',
            city: 'Test City',
            country: 'Test Country',
            phone: '0022379131510',
            email: 'test@test.com',
            establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
            establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
        };

        await request(app.getHttpServer())
            .post('/establishments')
            .auth(accessToken, { type: 'bearer' })
            .send(createEstablishmentDto)
            .expect(201)
            .expect(({ body }) => {
                expect(body).toEqual({
                    data: {
                        address: '123 Test St',
                        city: 'Test City',
                        country: 'Test Country',
                        createdAt: expect.any(String),
                        createdBy: null,
                        deletedAt: null,
                        deletedBy: null,
                        description: null,
                        id: expect.any(String),
                        name: 'Test Establishment',
                        phone: '0022379131510',
                        updatedAt: expect.any(String),
                        updatedBy: null,
                        establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                        establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
                    },
                    statusCode: 201,
                });
            });
    });

    it('/establishments/:id (PUT)', async () => {
        const createEstablishmentDto: CreateEstablishmentDto = {
            name: 'Test Establishment',
            address: '123 Test St',
            city: 'Test City',
            country: 'Test Country',
            phone: '0022379131510',
            email: 'test@test.com',
            establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
            establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
        };

        const id = await request(app.getHttpServer())
            .post('/establishments')
            .auth(accessToken, { type: 'bearer' })
            .send(createEstablishmentDto)
            .expect(201)
            .then(({ body }) => body.data.id);
        const updateEstablishmentDto = {
            id,
            name: 'Updated Establishment',
        };

        await request(app.getHttpServer())
            .put(`/establishments/${id}`)
            .auth(accessToken, { type: 'bearer' })
            .send(updateEstablishmentDto)
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual({
                    data: {
                        address: '123 Test St',
                        city: 'Test City',
                        country: 'Test Country',
                        createdAt: expect.any(String),
                        createdBy: null,
                        deletedAt: null,
                        deletedBy: null,
                        description: null,
                        id,
                        name: 'Updated Establishment',
                        phone: '0022379131510',
                        updatedAt: expect.any(String),
                        establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                        establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
                        updatedBy: null,
                    },
                    statusCode: 200,
                });
            });

        await request(app.getHttpServer())
            .delete(`/establishments/${id}`)
            .auth(accessToken, { type: 'bearer' })
            .expect(200);
    });

    it('/establishments/:id (DELETE)', async () => {
        const createEstablishmentDto: CreateEstablishmentDto = {
            name: 'Test Establishment',
            address: '123 Test St',
            city: 'Test City',
            country: 'Test Country',
            phone: '0022379131510',
            email: 'test@test.com',
            establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
            establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
        };

        const id = await request(app.getHttpServer())
            .post('/establishments')
            .auth(accessToken, { type: 'bearer' })
            .send(createEstablishmentDto)
            .then(({ body }) => {
                return body.data.id;
            });

        await request(app.getHttpServer())
            .delete(`/establishments/${id}`)
            .auth(accessToken, { type: 'bearer' })
            .expect(200);

        // Verify the establishment has been deleted
        await request(app.getHttpServer())
            .get(`/establishments/${id}`)
            .auth(accessToken, { type: 'bearer' })
            .expect(404);
    });

    it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
        await request(app.getHttpServer())
            .get('/establishments/b96567d7-a698-4fdc-8ea4-8eed850824e6')
            .auth(accessToken, { type: 'bearer' })
            .expect(404)
            .expect(({ body }) => {
                expect(body).toEqual({
                    error: expect.objectContaining({
                        code: 404,
                        error: 'Not Found',
                        message: 'Establishment not found',
                        path: '/establishments/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                    }),
                });
            });
    });
    it('should return "Bad Request" with an incorrect ID', async () => {
        await request(app.getHttpServer())
            .get('/establishments/undefined')
            .auth(accessToken, { type: 'bearer' })
            .expect(400)
            .expect(({ body }) => {
                expect(body).toEqual({
                    error: expect.objectContaining({
                        code: 400,
                        message: 'invalid input syntax for type uuid: "undefined"',
                        path: '/establishments/undefined',
                    }),
                });
            });
    });

    it('should search establishments by specialty', async () => {
        await request(app.getHttpServer())
            .get('/establishments?specialty=Dermatology')
            .auth(accessToken, { type: 'bearer' })
            .expect(200)
            .expect(({ body }) => {
                expect(body.data).toEqual([
                    {
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
                        affiliation: {
                            id: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                            name: 'public',
                        },
                        establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                        establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
                        specialties: [
                            {
                                id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                                name: 'Dermatology',
                            },
                        ],
                        type: {
                            id: '4d37ada2-8652-4268-b202-0db16fef70ba',
                            name: 'hospital',
                        },
                        updatedAt: expect.any(String),
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                    },
                ]);
            });
    });

    it('should return empty array when searching for non-existent specialty', async () => {
        await request(app.getHttpServer())
            .get('/establishments?specialty=NonExistentSpecialty')
            .auth(accessToken, { type: 'bearer' })
            .expect(200)
            .expect(({ body }) => {
                expect(body.data).toEqual([]);
                expect(body.total).toBe(0);
            });
    });

    it('should combine specialty search with other criteria', async () => {
        await request(app.getHttpServer())
            .get('/establishments?specialty=Dermatology&city=Bamako')
            .auth(accessToken, { type: 'bearer' })
            .expect(200)
            .expect(({ body }) => {
                expect(body.data).toEqual([
                    {
                        address: 'Rue Kati, Bamako, Mali',
                        city: 'Bamako',
                        country: 'Mali',
                        createdAt: '2024-05-20T23:13:00.000Z',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        deletedAt: null,
                        deletedBy: null,
                        id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        description: '',
                        name: 'Point G',
                        phone: '+22379131419',
                        affiliation: {
                            id: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                            name: 'public',
                        },
                        establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                        establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
                        specialties: [
                            {
                                id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
                                name: 'Dermatology',
                            },
                        ],
                        type: {
                            id: '4d37ada2-8652-4268-b202-0db16fef70ba',
                            name: 'hospital',
                        },
                        updatedAt: expect.any(String),
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                    },
                ]);
            });
    });

    it('GET /:id/time-slots should return array of timeslots', async () => {
        const establishmentId = 'f211f711-0e57-4c30-bbf2-7c9f576de879';

        await request(app.getHttpServer())
            .get(`/establishments/${establishmentId}/time-slots`)
            .auth(accessToken, { type: 'bearer' })
            .expect(200)
            .expect(({ body }) => {
                expect(body.data).toEqual([
                    {
                        available: expect.any(Boolean),
                        createdAt: '2024-05-20T23:13:04.000Z',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        date: expect.any(String),
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
                        date: expect.any(String),
                        deletedAt: null,
                        deletedBy: null,
                        endTime: '02:30:00',
                        establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        id: '56c63078-c32f-4d04-aa96-5e7815de1f98',
                        practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                        startTime: '01:30:00',
                        updatedAt: '2024-05-20T23:13:03.000Z',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                    },
                    {
                        available: false,
                        createdAt: '2024-05-20T23:13:02.000Z',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        date: expect.any(String),
                        deletedAt: null,
                        deletedBy: null,
                        endTime: '01:30:00',
                        establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        id: '4b42301e-0108-46f2-a721-e01dc8c359d2',
                        practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                        startTime: '01:00:00',
                        updatedAt: '2024-05-20T23:13:02.000Z',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                    },
                    {
                        available: false,
                        createdAt: '2024-05-20T23:13:01.000Z',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        date: expect.any(String),
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

    it('GET /:id/appointments should return array of appointments', async () => {
        const establishmentId = 'f211f711-0e57-4c30-bbf2-7c9f576de879';

        await request(app.getHttpServer())
            .get(`/establishments/${establishmentId}/appointments`)
            .auth(accessToken, { type: 'bearer' })
            .expect(200)
            .expect(({ body }) => {
                expect(body.data).toEqual([
                    {
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
                            establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                            establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
                            id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            name: 'Point G',
                            phone: '+22379131419',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                        establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        id: '41ab415c-6775-45da-9445-558baaeb6640',
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
                        timeSlotId: '6a2cb23b-2882-4a02-81c9-ac2d9c72775f',
                        timeslot: {
                            available: false,
                            createdAt: '2024-05-20T23:13:04.000Z',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            date: expect.any(String),
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
                        updatedAt: expect.any(String),
                        updatedBy: null,
                    },
                    {
                        appointmentStatusId: '186620b3-a831-440d-a4c7-f0ebc90b9d89',
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
                            establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                            establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
                            id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            name: 'Point G',
                            phone: '+22379131419',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                        establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        id: '12de8a17-686b-41b4-a1af-53e512ca957c',
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
                        timeSlotId: '091f0895-91c6-4fd0-b638-5db2dd933539',
                        timeslot: {
                            available: false,
                            createdAt: '2024-05-20T23:13:01.000Z',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            date: expect.any(String),
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
                        updatedAt: '2024-05-20T23:13:00.000Z',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
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
                            establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                            establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
                            id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            name: 'Point G',
                            phone: '+22379131419',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
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
                        timeSlotId: '4b42301e-0108-46f2-a721-e01dc8c359d2',
                        timeslot: {
                            available: false,
                            createdAt: '2024-05-20T23:13:02.000Z',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            date: expect.any(String),
                            deletedAt: null,
                            deletedBy: null,
                            endTime: '01:30:00',
                            establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            id: '4b42301e-0108-46f2-a721-e01dc8c359d2',
                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            startTime: '01:00:00',
                            updatedAt: '2024-05-20T23:13:02.000Z',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                        updatedAt: '2024-05-20T23:13:00.000Z',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
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
                            establishmentAffiliationId: 'dcb1639d-18c8-4a96-a8fd-23947b88bd0f',
                            establishmentTypeId: '4d37ada2-8652-4268-b202-0db16fef70ba',
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
                            createdAt: '2024-05-20T23:13:03.000Z',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            date: expect.any(String),
                            deletedAt: null,
                            deletedBy: null,
                            endTime: '02:30:00',
                            establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            id: '56c63078-c32f-4d04-aa96-5e7815de1f98',
                            practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                            startTime: '01:30:00',
                            updatedAt: '2024-05-20T23:13:03.000Z',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                        updatedAt: '2024-05-20T23:13:00.000Z',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                    },
                ]);
                expect(body.total).toBe(0);
            });
    });

    it('GET /:id/practicians should return array of practicians', async () => {
        const establishmentId = 'f211f711-0e57-4c30-bbf2-7c9f576de879';

        await request(app.getHttpServer())
            .get(`/establishments/${establishmentId}/practicians`)
            .auth(accessToken, { type: 'bearer' })
            .expect(200)
            .expect(({ body }) => {
                expect(body.data).toEqual([
                    {
                        createdAt: '2024-05-20T23:13:00.000Z',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        deletedAt: null,
                        deletedBy: null,
                        id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                        updatedAt: '2024-05-20T23:13:00.000Z',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        userId: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                    },
                    {
                        createdAt: '2024-05-20T23:13:00.000Z',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        deletedAt: null,
                        deletedBy: null,
                        id: '8372ee85-c443-4100-97ad-01adda4a553e',
                        updatedAt: '2024-05-20T23:13:00.000Z',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        userId: '92f24616-c19d-46a7-84e6-2f8715f7407d',
                    },
                ]);
                expect(body.total).toBe(2);
            });
    });
});
