import { INestApplication } from '@nestjs/common';

import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';

describe('RoleController', () => {
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
        it('should delete a role', async () => {
            // create role first
            const id = await request(app.getHttpServer())
                .post('/roles')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    name: 'roleToDelete',
                    description: 'roleToDelete',
                })
                .then(({ body }) => body.data.id);

            await request(app.getHttpServer())
                .delete(`/roles/${id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should get roles', async () => {
            return request(app.getHttpServer())
                .get('/roles')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                description: 'admin role',
                                id: '55386193-8051-4853-a0f9-8b6cd37083c7',
                                name: 'admin',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                                deletedAt: null,
                                deletedBy: null,
                            },
                            {
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                description: 'practician role',
                                id: 'dcc71837-5964-409f-b0c7-3ec4d9f3a114',
                                name: 'practician',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                                deletedAt: null,
                                deletedBy: null,
                            },
                            {
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                description: 'patient role',
                                id: '86a41c88-726b-4a69-8774-60a9960cfa09',
                                name: 'patient',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                                deletedAt: null,
                                deletedBy: null,
                            },
                            {
                                createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                description: 'collaborator role',
                                id: '314ad3cb-bec3-41da-8ef2-0486b0c7a6b3',
                                name: 'collaborator',
                                updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                                deletedAt: null,
                                deletedBy: null,
                            },
                        ],
                        total: 4,
                        statusCode: 200,
                    });
                });
        });

        it('should get a role', async () => {
            return request(app.getHttpServer())
                .get('/roles/55386193-8051-4853-a0f9-8b6cd37083c7')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        data: {
                            createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            description: 'admin role',
                            id: '55386193-8051-4853-a0f9-8b6cd37083c7',
                            name: 'admin',
                            updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                            deletedAt: null,
                            deletedBy: null,
                        },

                        statusCode: 200,
                    });
                });
        });

        it('should create a role', async () => {
            return request(app.getHttpServer())
                .post('/roles')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    name: 'roleToBeCreated',
                    description: 'role to be created',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        data: {
                            createdAt: expect.any(String),
                            createdBy: null,
                            deletedAt: null,
                            deletedBy: null,
                            description: 'role to be created',
                            id: expect.any(String),
                            name: 'roleToBeCreated',
                            updatedAt: expect.any(String),
                            updatedBy: null,
                        },

                        statusCode: 201,
                    });
                });
        });
    });
});
