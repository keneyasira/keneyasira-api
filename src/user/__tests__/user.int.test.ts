import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';

describe('UserController', () => {
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
        it('should get users', async () => {
            await request(app.getHttpServer())
                .get('/users')
                // .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                createdBy: null,
                                email: 'admin@keneyasira.com',
                                firstName: 'Admin',
                                id: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                lastName: 'Admin',
                                phone: '1234567890',
                                updatedBy: null,
                            },
                            {
                                createdBy: null,
                                email: 'practician@keneyasira.com',
                                firstName: 'Doctor',
                                id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
                                lastName: 'Doctor',
                                phone: '9876543210',
                                updatedBy: null,
                            },
                            {
                                createdBy: null,
                                email: 'patient@keneyasira.com',
                                firstName: 'Patient',
                                id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
                                lastName: 'Patient',
                                phone: '5551234567',
                                updatedBy: null,
                            },
                        ],
                        total: 3,
                    });
                });
        });

        it('should get a user', async () => {
            await request(app.getHttpServer())
                .get('/users/d7a05755-62d3-4a8e-9ea4-035d9fafd924')
                // .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        createdBy: null,
                        email: 'admin@keneyasira.com',
                        firstName: 'Admin',
                        id: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        lastName: 'Admin',
                        phone: '1234567890',
                        updatedBy: null,
                    });
                });
        });

        it('should update a user', async () => {
            // create user first
            const id = await request(app.getHttpServer())
                .post('/users')
                // .auth(token, { type: 'bearer' })
                .send({
                    email: 'titi@titi.com',
                    firstName: 'titi',
                    lastName: 'titi',
                    phone: '12345',
                })
                .then(({ body }) => {
                    return body.id;
                });

            await request(app.getHttpServer())
                .put(`/users/${id}`)
                // .auth(token, { type: 'bearer' })
                .send({
                    id,
                    firstName: 'firstName',
                    lastName: 'lastName',
                })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        id,
                        firstName: 'firstName',
                        lastName: 'lastName',
                    });
                });
        });

        it('should delete a user', async () => {
            const id = 'd7a05755-62d3-4a8e-9ea4-035d9fafd924';

            await request(app.getHttpServer())
                .delete(`/users/${id}`)
                // .auth(token, { type: 'bearer' })
                .expect(200);

            await request(app.getHttpServer())
                .get(`/users/${id}`)
                // .auth(token, { type: 'bearer' })
                .expect(404);
        });
    });
});
