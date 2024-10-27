import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CreateEstablishmentDto } from '../dtos/create-establishment.dto';
import { execSync } from 'child_process';
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
                expect(body).toEqual({});
            });
    });

    it('/establishments/:id (GET)', async () => {
        await request(app.getHttpServer())
            .get(`/establishments/f211f711-0e57-4c30-bbf2-7c9f576de879`)
            .auth(accessToken, { type: 'bearer' })
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual({});
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
                expect(body).toEqual({});
            });
    });

    it('/establishments/:id (PATCH)', async () => {
        const updateEstablishmentDto = {
            name: 'Updated Establishment',
        };

        await request(app.getHttpServer())
            .patch(`/establishments/f211f711-0e57-4c30-bbf2-7c9f576de879`)
            .auth(accessToken, { type: 'bearer' })
            .send(updateEstablishmentDto)
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual({});
            });
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
                return body.data.pop().id;
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
                        message: 'Not Found',
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
});
