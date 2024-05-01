import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import {
    cleanupKeycloakMock,
    getMockInstance,
    initiliazeKeycloakMock,
} from '../../utils/keycloak-mock.setup';

describe('MediaPersonaController', () => {
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
        it('should get media persona', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            return request(app.getHttpServer())
                .get('/media-persona')
                .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: [
                            {
                                createdBy: 'df77771b-fd53-5289-af4c-bf68f4824628',
                                id: '0424220a-cedc-5aaa-889e-b91a87efec67',
                                media: {
                                    id: '0b0404ee-4343-5f3d-80e4-b3fe8d1ded66',
                                    title: 'HIIT Brûle graisse',
                                    url: 'http://vimeo.mediaURL.HIIT.com?smartfit',
                                },
                                mediaId: '0b0404ee-4343-5f3d-80e4-b3fe8d1ded66',
                                persona: {
                                    id: '96f3aaad-d1e1-5ebc-b5d6-949724be785a',
                                    title: 'Intéressé/Curieux',
                                },
                                personaId: '96f3aaad-d1e1-5ebc-b5d6-949724be785a',
                                updatedBy: null,
                            },
                            {
                                createdBy: 'df77771b-fd53-5289-af4c-bf68f4824628',
                                id: '9295967a-595a-54a8-8474-d06fdea30cea',
                                media: {
                                    id: 'a390c09b-62c2-58d8-9476-9e688515f03b',
                                    title: 'Tabata',
                                    url: 'http://vimeo.mediaURL.tabata.com?smartfit',
                                },
                                mediaId: 'a390c09b-62c2-58d8-9476-9e688515f03b',
                                persona: {
                                    id: '8287734d-192f-50b6-8efe-4241a3e1501e',
                                    title: 'Jeune dynamique',
                                },
                                personaId: '8287734d-192f-50b6-8efe-4241a3e1501e',
                                updatedBy: null,
                            },
                            {
                                createdBy: 'df77771b-fd53-5289-af4c-bf68f4824628',
                                id: '6c196456-3a89-53e0-b105-8d6b2e8e675f',
                                media: {
                                    id: 'af8125f7-7736-5cde-9488-db4ed5371f91',
                                    title: 'Focus jambes',
                                    url: 'http://vimeo.mediaURL.jambes.com?smartfit',
                                },
                                mediaId: 'af8125f7-7736-5cde-9488-db4ed5371f91',
                                persona: {
                                    id: '8287734d-192f-50b6-8efe-4241a3e1501e',
                                    title: 'Jeune dynamique',
                                },
                                personaId: '8287734d-192f-50b6-8efe-4241a3e1501e',
                                updatedBy: null,
                            },
                            {
                                createdBy: 'df77771b-fd53-5289-af4c-bf68f4824628',
                                id: '5f598de6-f5bc-5b46-b17a-add2d38f554a',
                                media: {
                                    id: '15ab2375-677c-5c22-a8a5-def49d5a34d6',
                                    title: 'Focus bras',
                                    url: 'http://vimeo.mediaURL.bras.com?smartfit',
                                },
                                mediaId: '15ab2375-677c-5c22-a8a5-def49d5a34d6',
                                persona: {
                                    id: '8287734d-192f-50b6-8efe-4241a3e1501e',
                                    title: 'Jeune dynamique',
                                },
                                personaId: '8287734d-192f-50b6-8efe-4241a3e1501e',
                                updatedBy: null,
                            },
                            {
                                createdBy: 'df77771b-fd53-5289-af4c-bf68f4824628',
                                id: 'a67c4614-9fbd-5f18-ae36-bc496139ab10',
                                media: {
                                    id: 'c275b5c5-3db6-5e61-ad0e-2c5e5cbd8079',
                                    title: 'Focus pectoraux',
                                    url: 'http://vimeo.mediaURL.pectoraux.com?smartfit',
                                },
                                mediaId: 'c275b5c5-3db6-5e61-ad0e-2c5e5cbd8079',
                                persona: {
                                    id: '8287734d-192f-50b6-8efe-4241a3e1501e',
                                    title: 'Jeune dynamique',
                                },
                                personaId: '8287734d-192f-50b6-8efe-4241a3e1501e',
                                updatedBy: null,
                            },
                            {
                                createdBy: 'df77771b-fd53-5289-af4c-bf68f4824628',
                                id: '406d1317-1a8a-57a9-b863-39e1dbbcaf77',
                                media: {
                                    id: '0caca465-e944-5540-a88f-ba3f9d1a76e3',
                                    title: 'Focus abdominaux',
                                    url: 'http://vimeo.mediaURL.abdominaux.com?smartfit',
                                },
                                mediaId: '0caca465-e944-5540-a88f-ba3f9d1a76e3',
                                persona: {
                                    id: '8287734d-192f-50b6-8efe-4241a3e1501e',
                                    title: 'Jeune dynamique',
                                },
                                personaId: '8287734d-192f-50b6-8efe-4241a3e1501e',
                                updatedBy: null,
                            },
                        ],
                        total: 6,
                    });
                });
        });

        it('should get a media persona', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            return request(app.getHttpServer())
                .get('/media-persona/0424220a-cedc-5aaa-889e-b91a87efec67')
                .auth(token, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        createdBy: 'df77771b-fd53-5289-af4c-bf68f4824628',
                        id: '0424220a-cedc-5aaa-889e-b91a87efec67',
                        media: {
                            id: '0b0404ee-4343-5f3d-80e4-b3fe8d1ded66',
                            title: 'HIIT Brûle graisse',
                            url: 'http://vimeo.mediaURL.HIIT.com?smartfit',
                        },
                        mediaId: '0b0404ee-4343-5f3d-80e4-b3fe8d1ded66',
                        persona: {
                            id: '96f3aaad-d1e1-5ebc-b5d6-949724be785a',
                            title: 'Intéressé/Curieux',
                        },
                        personaId: '96f3aaad-d1e1-5ebc-b5d6-949724be785a',
                        updatedBy: null,
                    });
                });
        });

        it('should create a media persona', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            return request(app.getHttpServer())
                .post('/media-persona')
                .auth(token, { type: 'bearer' })
                .send({
                    mediaId: '18d058ea-d040-55b9-8191-80f1d444efba',
                    personaId: '29abea96-b1e7-55af-a067-124dc2ba7b5e',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toMatchObject({
                        createdBy: 'aa64ab80-6496-58cc-8be8-f305cbe8a75f',
                        mediaId: '18d058ea-d040-55b9-8191-80f1d444efba',
                        personaId: '29abea96-b1e7-55af-a067-124dc2ba7b5e',
                        updatedBy: null,
                    });
                });
        });
        it('should delete a media persona', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            return request(app.getHttpServer())
                .delete('/media-persona/9295967a-595a-54a8-8474-d06fdea30cea')
                .auth(token, { type: 'bearer' })
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            await request(app.getHttpServer())
                .get('/media-persona/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                .auth(token, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'Not Found',
                            path: '/media-persona/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            const kmock = getMockInstance();
            const user = kmock.database.users[1];
            const token = kmock.createBearerToken(user.profile.id);

            await request(app.getHttpServer())
                .get('/media-persona/undefined')
                .auth(token, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/media-persona/undefined',
                        }),
                    });
                });
        });
    });
});
