import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';

describe('AdminController', () => {
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
            roles: ['admin'],
            secret: 'secret',
            clientType: 'admin',
        });

        await app.init();
    });

    afterAll(async () => {
        if (app) await app.close();
    });

    describe('/', () => {
        it('should get admins', async () => {
            await request(app.getHttpServer())
                .get('/admins')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: expect.arrayContaining([
                            expect.objectContaining({
                                user: expect.objectContaining({
                                    email: 'admin@keneyasira.com',
                                    firstName: 'Admin',
                                    lastName: 'Admin',
                                    phone: '+22379131414',
                                }),
                            }),
                        ]),
                        total: 1,
                        statusCode: 200,
                    });
                });
        });

        it('should search admins by firstName', async () => {
            await request(app.getHttpServer())
                .get('/admins?firstName=Admin')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body.data).toEqual(
                        expect.arrayContaining([
                            expect.objectContaining({
                                user: expect.objectContaining({
                                    firstName: expect.stringMatching(/Admin/i),
                                }),
                            }),
                        ]),
                    );
                });
        });

        it('should search admins by lastName', async () => {
            await request(app.getHttpServer())
                .get('/admins?lastName=Admin')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body.data).toEqual(
                        expect.arrayContaining([
                            expect.objectContaining({
                                user: expect.objectContaining({
                                    lastName: expect.stringMatching(/Admin/i),
                                }),
                            }),
                        ]),
                    );
                });
        });

        it('should search admins by email', async () => {
            await request(app.getHttpServer())
                .get('/admins?email=admin@keneyasira.com')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body.data).toEqual(
                        expect.arrayContaining([
                            expect.objectContaining({
                                user: expect.objectContaining({
                                    email: 'admin@keneyasira.com',
                                }),
                            }),
                        ]),
                    );
                });
        });

        it('should search admins by phone', async () => {
            await request(app.getHttpServer())
                .get('/admins?phone=+22379131414')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body.data).toEqual(
                        expect.arrayContaining([
                            expect.objectContaining({
                                user: expect.objectContaining({
                                    phone: '+22379131414',
                                }),
                            }),
                        ]),
                    );
                });
        });

        it('should create an admin', async () => {
            const newAdmin = {
                email: 'newadmin@example.com',
                firstName: 'New',
                lastName: 'Admin',
                phone: '+22379131420',
            };

            const response = await request(app.getHttpServer())
                .post('/admins')
                .auth(accessToken, { type: 'bearer' })
                .send(newAdmin)
                .expect(201);

            expect(response.body.data).toMatchObject({
                user: expect.objectContaining({
                    email: newAdmin.email,
                    firstName: newAdmin.firstName,
                    lastName: newAdmin.lastName,
                    phone: newAdmin.phone,
                }),
            });

            // Clean up
            await request(app.getHttpServer())
                .delete(`/admins/${response.body.data.id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should return conflict when creating admin with existing email', async () => {
            const existingAdmin = {
                email: 'admin@keneyasira.com',
                firstName: 'Test',
                lastName: 'Admin',
                phone: '+22379131421',
            };

            await request(app.getHttpServer())
                .post('/admins')
                .auth(accessToken, { type: 'bearer' })
                .send(existingAdmin)
                .expect(409);
        });

        it('should return conflict when creating admin with existing phone', async () => {
            const existingAdmin = {
                email: 'newadmin@example.com',
                firstName: 'Test',
                lastName: 'Admin',
                phone: '+22379131414',
            };

            await request(app.getHttpServer())
                .post('/admins')
                .auth(accessToken, { type: 'bearer' })
                .send(existingAdmin)
                .expect(409);
        });
    });
});
