import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';

describe('userRoleController', () => {
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
        it('should delete a user-role', async () => {
            // create user-role first
            const id = await request(app.getHttpServer())
                .post('/user-role')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    roleId: '55386193-8051-4853-a0f9-8b6cd37083c7',
                    userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                })
                .then(({ body }) => {
                    return body.data.id;
                });

            return request(app.getHttpServer())
                .delete(`/user-role/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it.skip('should get user-roles', async () => {
            return request(app.getHttpServer())
                .get('/user-role')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                id: '4087a17a-805d-4a6a-a81b-3eb7eb1a9386',
                                role: {
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    description: 'admin role',
                                    id: '55386193-8051-4853-a0f9-8b6cd37083c7',
                                    name: 'admin',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                },
                                roleId: '55386193-8051-4853-a0f9-8b6cd37083c7',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                user: {
                                    createdBy: null,
                                    email: 'admin@keneyasira.com',
                                    firstName: 'Admin',
                                    id: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    lastName: 'Admin',
                                    phone: '+22379131414',
                                    updatedBy: null,
                                },
                                userId: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                            {
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                id: 'ccdbe78c-3403-4c67-b4f8-c7ac0fe1e05b',
                                role: {
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    description: 'practician role',
                                    id: 'dcc71837-5964-409f-b0c7-3ec4d9f3a114',
                                    name: 'practician',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                },
                                roleId: 'dcc71837-5964-409f-b0c7-3ec4d9f3a114',
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
                            {
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                id: 'f49a12e6-4f3c-4b24-869d-b54f80db9f61',
                                role: {
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    description: 'patient role',
                                    id: '86a41c88-726b-4a69-8774-60a9960cfa09',
                                    name: 'patient',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                },
                                roleId: '86a41c88-726b-4a69-8774-60a9960cfa09',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                user: {
                                    createdBy: null,
                                    email: 'patient@keneyasira.com',
                                    firstName: 'Patient',
                                    id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                    lastName: 'Patient',
                                    phone: '+22379131416',
                                    updatedBy: null,
                                },
                                userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                            },
                        ],
                        total: 3,
                        statusCode: 200,
                    });
                });
        });

        it('should get a user-role', async () => {
            return request(app.getHttpServer())
                .get('/user-role/4087a17a-805d-4a6a-a81b-3eb7eb1a9386')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        data: {
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            id: expect.any(String),
                            role: {
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                description: 'admin role',
                                id: '55386193-8051-4853-a0f9-8b6cd37083c7',
                                name: 'admin',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                            roleId: '55386193-8051-4853-a0f9-8b6cd37083c7',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            user: {
                                createdBy: null,
                                email: 'admin@keneyasira.com',
                                firstName: 'Admin',
                                id: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                lastName: 'Admin',
                                phone: '+22379131414',
                                updatedBy: null,
                            },
                            userId: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        },
                        statusCode: 200,
                    });
                });
        });

        it('should create a user-role', async () => {
            return request(app.getHttpServer())
                .post('/user-role')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                    roleId: 'dcc71837-5964-409f-b0c7-3ec4d9f3a114',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        data: {
                            createdBy: null,
                            id: expect.any(String),
                            role: {
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                description: 'practician role',
                                id: 'dcc71837-5964-409f-b0c7-3ec4d9f3a114',
                                name: 'practician',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            },
                            roleId: 'dcc71837-5964-409f-b0c7-3ec4d9f3a114',
                            updatedBy: null,
                            user: {
                                createdBy: null,
                                email: 'patient@keneyasira.com',
                                firstName: 'Patient',
                                id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                lastName: 'Patient',
                                phone: '+22379131416',
                                updatedBy: null,
                            },
                            userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                        },
                        statusCode: 201,
                    });
                });
        });
    });
});
