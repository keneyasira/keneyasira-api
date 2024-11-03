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
                            id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                            name: 'Point G',
                            phone: '+22379131419',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                        {
                            address: 'Av. Van Vollenhoven, Bamako, Mali',
                            city: 'Bamako',
                            country: 'Mali',
                            createdAt: '2024-05-20T23:13:00.000Z',
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            deletedAt: null,
                            deletedBy: null,
                            id: '90b93a53-4109-4182-aa28-d4f3af0b87bb',
                            name: 'Gabriel Toure',
                            phone: '+22379131418',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
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
                        id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        name: 'Point G',
                        phone: '+22379131419',
                        updatedAt: '2024-05-20T23:13:00.000Z',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
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
                        id: expect.any(String),
                        name: 'Test Establishment',
                        phone: '0022379131510',
                        updatedAt: expect.any(String),
                        updatedBy: null,
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
                        id,
                        name: 'Updated Establishment',
                        phone: '0022379131510',
                        updatedAt: expect.any(String),
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
                        id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                        name: 'Point G',
                        phone: '+22379131419',
                        specialties: [
                            {
                                EstablishmentHasSpecialty: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    deletedAt: null,
                                    deletedBy: null,
                                    establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                    id: '77a093ae-2d0c-4cac-b8cb-c4bbb035439a',
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
                        name: 'Point G',
                        phone: '+22379131419',
                        specialties: [
                            {
                                EstablishmentHasSpecialty: {
                                    createdAt: '2024-05-20T23:13:00.000Z',
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    deletedAt: null,
                                    deletedBy: null,
                                    establishmentId: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                    id: '77a093ae-2d0c-4cac-b8cb-c4bbb035439a',
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
                        updatedAt: expect.any(String),
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                    },
                ]);
            });
    });
});
