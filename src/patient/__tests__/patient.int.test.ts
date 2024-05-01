import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import {
    cleanupKeycloakMock,
    getMockInstance,
    initiliazeKeycloakMock,
} from '../../utils/keycloak-mock.setup';

describe('CategoryController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        await initiliazeKeycloakMock();

        const testingModule = await getTestingModule();

        app = testingModule.createNestApplication();

        execSync('make regenerate-db-test');
        await app.init();
    });

    afterAll(async () => {
        if (app) await app.close();
        cleanupKeycloakMock();
    });

    describe('/', () => {
        it('should get categories', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            return request(app.getHttpServer())
                .get('/category')
                .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                createdBy: '5ffd2cde-53fb-5155-9b1f-f2955d29ba4d',
                                id: 'f95c9df8-5932-564d-8aa0-bc101e1a69e8',
                                image: {
                                    id: 'e540ae76-2900-550a-9002-0a69c4c1d2df',
                                    url: 'https://picsum.photos/id/1',
                                },
                                imageId: 'e540ae76-2900-550a-9002-0a69c4c1d2df',
                                path: null,
                                tag: {
                                    id: '2dc13e7b-a8cb-5eeb-b4bf-5e24b937cdb1',
                                    title: 'Muscle',
                                },
                                tagId: '2dc13e7b-a8cb-5eeb-b4bf-5e24b937cdb1',
                                title: 'Musculation',
                                updatedBy: null,
                            },
                            {
                                createdBy: '5ffd2cde-53fb-5155-9b1f-f2955d29ba4d',
                                id: '66e6df29-ec74-512b-ad9c-c74f19750078',
                                image: {
                                    id: '7efb7ecd-b450-53d2-b3be-2b8ba4366751',
                                    url: 'https://picsum.photos/id/1',
                                },
                                imageId: '7efb7ecd-b450-53d2-b3be-2b8ba4366751',
                                path: null,
                                tag: {
                                    id: 'd16d0524-ed5f-4375-a644-3b2446e1343a',
                                    title: 'Bien être',
                                },
                                tagId: 'd16d0524-ed5f-4375-a644-3b2446e1343a',
                                title: 'Bien être',
                                updatedBy: null,
                            },
                            {
                                createdBy: '5ffd2cde-53fb-5155-9b1f-f2955d29ba4d',
                                id: 'a27d8108-d6bf-5e07-9323-ea78b8121ea2',
                                image: {
                                    id: '22daa388-f6ac-5bc2-aa60-3fd4e2c1d420',
                                    url: 'https://picsum.photos/id/1',
                                },
                                imageId: '22daa388-f6ac-5bc2-aa60-3fd4e2c1d420',
                                path: null,
                                tag: {
                                    id: '7a208062-dcd7-5821-99a9-06cbc15f4ddb',
                                    title: 'Nutrition',
                                },
                                tagId: '7a208062-dcd7-5821-99a9-06cbc15f4ddb',
                                title: 'Nutrition',
                                updatedBy: null,
                            },
                        ],
                        total: 3,
                    });
                });
        });

        it('should get a category', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            return request(app.getHttpServer())
                .get('/category/f95c9df8-5932-564d-8aa0-bc101e1a69e8')
                .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        createdBy: '5ffd2cde-53fb-5155-9b1f-f2955d29ba4d',
                        id: 'f95c9df8-5932-564d-8aa0-bc101e1a69e8',
                        image: {
                            id: 'e540ae76-2900-550a-9002-0a69c4c1d2df',
                            url: 'https://picsum.photos/id/1',
                        },
                        imageId: 'e540ae76-2900-550a-9002-0a69c4c1d2df',
                        path: null,
                        tag: {
                            id: '2dc13e7b-a8cb-5eeb-b4bf-5e24b937cdb1',
                            title: 'Muscle',
                        },
                        tagId: '2dc13e7b-a8cb-5eeb-b4bf-5e24b937cdb1',
                        title: 'Musculation',
                        updatedBy: null,
                    });
                });
        });

        it('should create a category', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            return request(app.getHttpServer())
                .post('/category')
                .auth(token, { type: 'bearer' })
                .send({
                    title: 'Sueur',
                    imageId: 'e540ae76-2900-550a-9002-0a69c4c1d2df',
                    tagId: 'e8db9c31-5981-5927-8c5c-480d6964b59a',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        imageId: 'e540ae76-2900-550a-9002-0a69c4c1d2df',
                        path: null,
                        tagId: 'e8db9c31-5981-5927-8c5c-480d6964b59a',
                        title: 'Sueur',
                        updatedBy: null,
                        createdBy: 'aa64ab80-6496-58cc-8be8-f305cbe8a75f',
                    });
                });
        });

        it('should update a category', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            return request(app.getHttpServer())
                .put('/category/f95c9df8-5932-564d-8aa0-bc101e1a69e8')
                .auth(token, { type: 'bearer' })
                .send({
                    id: 'f95c9df8-5932-564d-8aa0-bc101e1a69e8',
                    imageId: 'e540ae76-2900-550a-9002-0a69c4c1d2df',
                    tagId: 'e8db9c31-5981-5927-8c5c-480d6964b59a',
                })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        createdBy: '5ffd2cde-53fb-5155-9b1f-f2955d29ba4d',
                        id: 'f95c9df8-5932-564d-8aa0-bc101e1a69e8',
                        imageId: 'e540ae76-2900-550a-9002-0a69c4c1d2df',
                        path: null,
                        tagId: 'e8db9c31-5981-5927-8c5c-480d6964b59a',
                        title: 'Musculation',
                        updatedBy: 'aa64ab80-6496-58cc-8be8-f305cbe8a75f',
                    });
                });
        });

        it('should delete a category', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            return request(app.getHttpServer())
                .delete('/category/f95c9df8-5932-564d-8aa0-bc101e1a69e8')
                .auth(token, { type: 'bearer' })
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            await request(app.getHttpServer())
                .get('/category/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                .auth(token, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'Not Found',
                            path: '/category/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            await request(app.getHttpServer())
                .get('/category/undefined')
                .auth(token, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/category/undefined',
                        }),
                    });
                });
        });
    });
});
