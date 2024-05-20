import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';

describe('userRoleController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const testingModule = await getTestingModule();

        app = testingModule.createNestApplication();

        execSync('make regenerate-db-test');
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
                // .auth(token, { type: 'bearer' })
                .send({
                    roleId: '55386193-8051-4853-a0f9-8b6cd37083c7',
                    userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                })
                .then(({ body }) => {
                    return body.id;
                });

            return (
                request(app.getHttpServer())
                    .delete(`/user-role/${id}`)
                    // .auth(token, { type: 'bearer' })
                    .expect(200)
            );
        });

        it('should get user-roles', async () => {
            return (
                request(app.getHttpServer())
                    .get('/user-role')
                    // .auth(token, { type: 'bearer' })
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
                                        phone: '1234567890',
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
                                        phone: '9876543210',
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
                                        phone: '5551234567',
                                        updatedBy: null,
                                    },
                                    userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                },
                            ],
                            total: 3,
                        });
                    })
            );
        });

        it('should get a user-role', async () => {
            return (
                request(app.getHttpServer())
                    .get('/user-role/4087a17a-805d-4a6a-a81b-3eb7eb1a9386')
                    // .auth(token, { type: 'bearer' })
                    .expect(200)
                    .expect(({ body }) => {
                        expect(body).toMatchObject({});
                    })
            );
        });

        it('should create a user-role', async () => {
            return (
                request(app.getHttpServer())
                    .post('/user-role')
                    // .auth(token, { type: 'bearer' })
                    .send({
                        userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                        roleId: 'dcc71837-5964-409f-b0c7-3ec4d9f3a114',
                    })
                    .expect(201)
                    .expect(({ body }) => {
                        expect(body).toMatchObject({
                            userId: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                            roleId: 'dcc71837-5964-409f-b0c7-3ec4d9f3a114',
                        });
                    })
            );
        });
    });
});
