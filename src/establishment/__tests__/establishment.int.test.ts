import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { CreateEstablishmentDto } from '../dtos/create-establishment.dto';
import { execSync } from 'child_process';

describe('EstablishmentController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        execSync('make regenerate-db-test');
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('/establishments (POST)', async () => {
        const createEstablishmentDto: CreateEstablishmentDto = {
            name: 'Test Establishment',
            address: '123 Test St',
            city: 'Test City',
            country: 'Test Country',
            phone: '0022379131510',
            email: 'test@test.com'
        };

        await request(app.getHttpServer())
            .post('/establishments')
            .send(createEstablishmentDto)
            .expect(201)
            .expect(({ body }) => {
                expect(body).toEqual({});
            });
    });

    it('/establishments (GET)', async () => {
        await request(app.getHttpServer())
            .get('/establishments')
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual({});
            });
    });

    it('/establishments/:id (GET)', async () => {
        await request(app.getHttpServer())
            .get(`/establishments/f211f711-0e57-4c30-bbf2-7c9f576de879`)
            .expect(200)
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
            .send(updateEstablishmentDto)
            .expect(200)
            .expect(({ body }) => {
                expect(body).toEqual({});
            });
    });

    it('/establishments/:id (DELETE)', async () => {
        await request(app.getHttpServer())
            .delete(`/establishments/f211f711-0e57-4c30-bbf2-7c9f576de879`)
            .expect(200);

        // Verify the establishment has been deleted
        await request(app.getHttpServer())
            .get(`/establishments/f211f711-0e57-4c30-bbf2-7c9f576de879`)
            .expect(404);
    });

    it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
        await request(app.getHttpServer())
            .get('/establishments/b96567d7-a698-4fdc-8ea4-8eed850824e6')
            // .auth(token, { type: 'bearer' })
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
            // .auth(token, { type: 'bearer' })
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
