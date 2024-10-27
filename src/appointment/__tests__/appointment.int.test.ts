import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { JwtService } from '@nestjs/jwt';
import { getTestingModule } from '../../core/testing';

describe('AppointmentController', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let accessToken: string;

    beforeAll(async () => {
        const testingModule = await getTestingModule();
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

        execSync('make regenerate-db-test');
        await app.init();
    });

    afterAll(async () => {
        if (app) await app.close();
    });

    describe('/', () => {
        it('should get appointments', async () => {
            await request(app.getHttpServer())
                .get('/appointments')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({});
                });
        });

        it('should get appointment by id', async () => {
            await request(app.getHttpServer())
                .get('/appointments/12de8a17-686b-41b4-a1af-53e512ca957c')
                .auth(accessToken, { type: 'bearer' })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        data: {
                            id: '12de8a17-686b-41b4-a1af-53e512ca957c',
                            appointmentStatusId: '186620b3-a831-440d-a4c7-f0ebc90b9d89',
                            appointmentStatus: {
                                id: '186620b3-a831-440d-a4c7-f0ebc90b9d89',
                                name: 'scheduled',
                            },
                            timeSlotId: '091f0895-91c6-4fd0-b638-5db2dd933539',
                            timeSlot: {
                                id: '091f0895-91c6-4fd0-b638-5db2dd933539',
                                start: '2024-05-20T09:00:00.000Z',
                                end: '2024-05-20T09:30:00.000Z',
                            },
                            patient: {
                                id: '632273cc-de99-4582-a440-752ba1f78766',
                                firstName: 'John',
                                lastName: 'Doe',
                            },
                            practician: {
                                id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                                firstName: 'Jane',
                                lastName: 'Doe',
                            },
                            establishment: {
                                id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                                name: 'Clinic A',
                            },
                            createdBy: {
                                id: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                firstName: 'Admin',
                                lastName: 'Admin',
                            },
                            updatedBy: {
                                id: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
                                firstName: 'Admin',
                                lastName: 'Admin',
                            },
                            createdAt: '2024-05-20T23:13:00.000Z',
                            updatedAt: '2024-05-20T23:13:00.000Z',
                        },
                    });
                });
        });

        it('should create appointment with scheduled status', async () => {
            await request(app.getHttpServer())
                .post('/appointments')
                .auth(accessToken, { type: 'bearer' })
                .send({
                    patient_id: '632273cc-de99-4582-a440-752ba1f78766',
                    time_slot_id: '6a2cb23b-2882-4a02-81c9-ac2d9c72775f',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({});
                });
        });

        xit('should confirm an appointment', async () => {
            await request(app.getHttpServer())
                .post('/appointments/12de8a17-686b-41b4-a1af-53e512ca957c')
                .auth(accessToken, { type: 'bearer' })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({});
                });
        });

        xit('should cancel an appointment', async () => {
            // create new appointment
            await request(app.getHttpServer()).post('/appointments').send({
                establishment_id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                practician_id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                patient_id: '632273cc-de99-4582-a440-752ba1f78766',
                time_slot_id: '6a2cb23b-2882-4a02-81c9-ac2d9c72775f',
            });

            await request(app.getHttpServer())
                .post('/appointments/:id/cancel')
                .auth(accessToken, { type: 'bearer' })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({});
                });
        });

        xit('should complete an appointment', async () => {
            // create new appointment to complete
            await request(app.getHttpServer()).post('/appointments').send({
                establishment_id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
                practician_id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                patient_id: '632273cc-de99-4582-a440-752ba1f78766',
                time_slot_id: '6a2cb23b-2882-4a02-81c9-ac2d9c72775f',
            });

            await request(app.getHttpServer())
                .post('/appointments/:id/complete')
                .auth(accessToken, { type: 'bearer' })
                .send({})
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({});
                });
        });

        xit('should delete an appointment', async () => {
            await request(app.getHttpServer())
                .delete('/appointments/12de8a17-686b-41b4-a1af-53e512ca957c')
                .auth(accessToken, { type: 'bearer' })
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/appointments/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                .auth(accessToken, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        // error: expect.objectContaining({
                        //     code: 404,
                        //     error: 'Not Found',
                        //     message: 'Appointment Not Found',
                        //     path: '/appointments/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        // }),
                    });
                });
        });

        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/appointments/undefined')
                .auth(accessToken, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/appointments/undefined',
                        }),
                    });
                });
        });
    });
});
