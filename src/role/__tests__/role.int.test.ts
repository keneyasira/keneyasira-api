import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';

describe('RoleController', () => {
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
        it('should delete a role', async () => {
            // create role first
            const id = await request(app.getHttpServer())
                .post('/roles')
                // .auth(token, { type: 'bearer' })
                .send({
                    name: 'roleToDelete',
                    description: 'roleToDelete',
                })
                .then(({ body }) => {
                    return body.id;
                });

            return (
                request(app.getHttpServer())
                    .delete(`/roles/${id}`)
                    // .auth(token, { type: 'bearer' })
                    .expect(200)
            );
        });

        it('should get roles', async () => {
            return (
                request(app.getHttpServer())
                    .get('/roles')
                    // .auth(token, { type: 'bearer' })
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
                                },
                                {
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    description: 'practician role',
                                    id: 'dcc71837-5964-409f-b0c7-3ec4d9f3a114',
                                    name: 'practician',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                },
                                {
                                    createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                    description: 'patient role',
                                    id: '86a41c88-726b-4a69-8774-60a9960cfa09',
                                    name: 'patient',
                                    updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                },
                            ],
                            total: 3,
                        });
                    })
            );
        });

        it('should get a role', async () => {
            return (
                request(app.getHttpServer())
                    .get('/roles/55386193-8051-4853-a0f9-8b6cd37083c7')
                    // .auth(token, { type: 'bearer' })
                    .expect(200)
                    .expect(({ body }) => {
                        expect(body).toMatchObject({
                            id: '55386193-8051-4853-a0f9-8b6cd37083c7',
                            name: 'admin',
                            description: 'admin role',
                        });
                    })
            );
        });

        it('should create a role', async () => {
            return (
                request(app.getHttpServer())
                    .post('/roles')
                    // .auth(token, { type: 'bearer' })
                    .send({
                        name: 'roleToBeCreated',
                        description: 'role to be created',
                    })
                    .expect(201)
                    .expect(({ body }) => {
                        expect(body).toMatchObject({
                            name: 'roleToBeCreated',
                            description: 'role to be created',
                        });
                    })
            );
        });
    });
});
