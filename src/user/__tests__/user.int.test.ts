import { INestApplication } from '@nestjs/common';

import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';

describe('UserController', () => {
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
        it.skip('should get users', async () => {
            await request(app.getHttpServer())
                .get('/users')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                email: 'admin@keneyasira.com',
                                firstName: 'Admin',
                                id: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                lastName: 'Admin',
                                phone: '+22379131414',
                                createdBy: null,
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: null,
                                deletedAt: null,
                                deletedBy: null,
                            },
                            {
                                email: 'practician@keneyasira.com',
                                firstName: 'Doctor',
                                id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                lastName: 'Doctor',
                                phone: '+22379131415',
                                createdBy: null,
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: null,
                                deletedAt: null,
                                deletedBy: null,
                            },
                            {
                                email: 'patient@keneyasira.com',
                                firstName: 'Patient',
                                id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                lastName: 'Patient',
                                phone: '+22379131416',
                                createdBy: null,
                                createdAt: '2024-05-20T23:13:00.000Z',
                                updatedAt: '2024-05-20T23:13:00.000Z',
                                updatedBy: null,
                                deletedAt: null,
                                deletedBy: null,
                            },
                        ],
                        total: 3,
                        statusCode: 200,
                    });
                });
        });

        it('should get a user', async () => {
            await request(app.getHttpServer())
                .get('/users/d7a05755-62d3-4a8e-9ea4-035d9fafd924')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: {
                            email: 'admin@keneyasira.com',
                            firstName: 'Admin',
                            id: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            lastName: 'Admin',
                            phone: '+22379131414',
                            createdBy: null,
                            createdAt: '2024-05-20T23:13:00.000Z',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            updatedBy: null,
                            deletedAt: null,
                            deletedBy: null,
                        },
                        statusCode: 200,
                    });
                });
        });
    });
});
