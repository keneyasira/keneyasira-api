import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';

describe('CollaboratorController', () => {
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
        it('should create and get collaborators', async () => {
            // First create a collaborator
            const newCollaborator = {
                email: 'collaborator@example.com',
                firstName: 'Test',
                lastName: 'Collaborator',
                phone: '+22379131422',
            };

            const createResponse = await request(app.getHttpServer())
                .post('/collaborators')
                .auth(accessToken, { type: 'bearer' })
                .send(newCollaborator)
                .expect(201);

            // Then get all collaborators
            const getResponse = await request(app.getHttpServer())
                .get('/collaborators')
                .auth(accessToken, { type: 'bearer' })
                .expect(200);

            expect(getResponse.body).toEqual({
                data: [
                    {
                        createdAt: expect.any(String),
                        createdBy: null,
                        deletedAt: null,
                        deletedBy: null,
                        id: expect.any(String),
                        updatedAt: expect.any(String),
                        updatedBy: null,
                        user: {
                            createdAt: expect.any(String),
                            createdBy: null,
                            deletedAt: null,
                            deletedBy: null,
                            email: 'collaborator@example.com',
                            firstName: 'Test',
                            id: expect.any(String),
                            lastName: 'Collaborator',
                            phone: '+22379131422',
                            updatedAt: expect.any(String),
                            updatedBy: null,
                        },
                        userId: expect.any(String),
                    },
                    {
                        createdAt: '2024-05-20T23:13:00.000Z',
                        createdBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        deletedAt: null,
                        deletedBy: null,
                        id: '52525920-e848-42cb-9faa-4bcfef3419d9',
                        updatedAt: '2024-05-20T23:13:00.000Z',
                        updatedBy: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                        user: {
                            createdAt: '2024-05-20T23:13:00.000Z',
                            createdBy: null,
                            deletedAt: null,
                            deletedBy: null,
                            email: 'collaborator@keneyasira.com',
                            firstName: 'Collaborator',
                            id: 'e66d2f6d-056d-4513-a75e-7e0f400e0698',
                            lastName: 'Collaborator',
                            phone: '+22379131417',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                            updatedBy: null,
                        },
                        userId: 'e66d2f6d-056d-4513-a75e-7e0f400e0698',
                    },
                ],
                statusCode: 200,
                total: 2,
            });

            // Clean up
            await request(app.getHttpServer())
                .delete(`/collaborators/${createResponse.body.data.id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should search collaborators by firstName', async () => {
            const collaborator = {
                email: 'searchtest@example.com',
                firstName: 'SearchTest',
                lastName: 'Collaborator',
                phone: '+22379131423',
            };

            const createResponse = await request(app.getHttpServer())
                .post('/collaborators')
                .auth(accessToken, { type: 'bearer' })
                .send(collaborator)
                .expect(201);

            const searchResponse = await request(app.getHttpServer())
                .get('/collaborators?firstName=SearchTest')
                .auth(accessToken, { type: 'bearer' })
                .expect(200);

            expect(searchResponse.body.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        user: expect.objectContaining({
                            firstName: 'SearchTest',
                        }),
                    }),
                ]),
            );

            // Clean up
            await request(app.getHttpServer())
                .delete(`/collaborators/${createResponse.body.data.id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should search collaborators by lastName', async () => {
            const collaborator = {
                email: 'lastname@example.com',
                firstName: 'Test',
                lastName: 'SearchLastName',
                phone: '+22379131424',
            };

            const createResponse = await request(app.getHttpServer())
                .post('/collaborators')
                .auth(accessToken, { type: 'bearer' })
                .send(collaborator)
                .expect(201);

            const searchResponse = await request(app.getHttpServer())
                .get('/collaborators?lastName=SearchLastName')
                .auth(accessToken, { type: 'bearer' })
                .expect(200);

            expect(searchResponse.body.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        user: expect.objectContaining({
                            lastName: 'SearchLastName',
                        }),
                    }),
                ]),
            );

            // Clean up
            await request(app.getHttpServer())
                .delete(`/collaborators/${createResponse.body.data.id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should search collaborators by email', async () => {
            const collaborator = {
                email: 'searchemail@example.com',
                firstName: 'Test',
                lastName: 'Collaborator',
                phone: '+22379131425',
            };

            const createResponse = await request(app.getHttpServer())
                .post('/collaborators')
                .auth(accessToken, { type: 'bearer' })
                .send(collaborator)
                .expect(201);

            const searchResponse = await request(app.getHttpServer())
                .get('/collaborators?email=searchemail@example.com')
                .auth(accessToken, { type: 'bearer' })
                .expect(200);

            expect(searchResponse.body.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        user: expect.objectContaining({
                            email: 'searchemail@example.com',
                        }),
                    }),
                ]),
            );

            // Clean up
            await request(app.getHttpServer())
                .delete(`/collaborators/${createResponse.body.data.id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should search collaborators by phone', async () => {
            const collaborator = {
                email: 'phone@example.com',
                firstName: 'Test',
                lastName: 'Collaborator',
                phone: '+22379131426',
            };

            const createResponse = await request(app.getHttpServer())
                .post('/collaborators')
                .auth(accessToken, { type: 'bearer' })
                .send(collaborator)
                .expect(201);

            const searchResponse = await request(app.getHttpServer())
                .get('/collaborators?phone=+22379131426')
                .auth(accessToken, { type: 'bearer' })
                .expect(200);

            expect(searchResponse.body.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        user: expect.objectContaining({
                            phone: '+22379131426',
                        }),
                    }),
                ]),
            );

            // Clean up
            await request(app.getHttpServer())
                .delete(`/collaborators/${createResponse.body.data.id}`)
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should return conflict when creating collaborator with existing email', async () => {
            const existingCollaborator = {
                email: 'collaborator@keneyasira.com',
                firstName: 'Test',
                lastName: 'Collaborator',
                phone: '+22379131427',
            };

            await request(app.getHttpServer())
                .post('/collaborators')
                .auth(accessToken, { type: 'bearer' })
                .send(existingCollaborator)
                .expect(409);
        });

        it('should return conflict when creating collaborator with existing phone', async () => {
            const existingCollaborator = {
                email: 'newcollaborator@example.com',
                firstName: 'Test',
                lastName: 'Collaborator',
                phone: '+22379131417',
            };

            await request(app.getHttpServer())
                .post('/collaborators')
                .auth(accessToken, { type: 'bearer' })
                .send(existingCollaborator)
                .expect(409);
        });
    });
});
