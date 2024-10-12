import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';
import { UpdateTimeSlotDto } from '../dtos/update-time-slot.dto';

describe('TimeSlotController', () => {
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
        it('should get time slots', async () => {
            await request(app.getHttpServer())
                .get('/time-slots')
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({});
                });
        });

        it('should get a time slot', async () => {
            await request(app.getHttpServer())
                .get(`/time-slots/091f0895-91c6-4fd0-b638-5db2dd933539`)
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({});
                });
        });

        it('should create a time slot', async () => {
            await request(app.getHttpServer())
                .post('/time-slots')
                .send({
                    available: true,
                    startDate: new Date().toISOString(),
                    endDate: new Date().toISOString(),
                    establishmentId: '90b93a53-4109-4182-aa28-d4f3af0b87bb',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({});
                });

            await request(app.getHttpServer())
                .post('/time-slots')
                .send({
                    available: true,
                    startDate: new Date().toISOString(),
                    endDate: new Date().toISOString(),
                    practicianId: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
                    establishmentId: '90b93a53-4109-4182-aa28-d4f3af0b87bb',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toEqual({});
                });
        });

        it('should update a time slot', async () => {
            const updateDto: UpdateTimeSlotDto = {
                id: '091f0895-91c6-4fd0-b638-5db2dd933539',
                available: true,
            };

            await request(app.getHttpServer())
                .put(`/time-slots/${updateDto.id}`)
                .send(updateDto)
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual({});
                });
        });

        it('should delete a time slot', async () => {
            await request(app.getHttpServer())
                .delete(`/time-slots/091f0895-91c6-4fd0-b638-5db2dd933539`)
                .expect(200);
        });

        it('should return "Not Found" when passing an ID which is absent from the DB', async () => {
            await request(app.getHttpServer())
                .get('/time-slots/b96567d7-a698-4fdc-8ea4-8eed850824e6')
                // .auth(token, { type: 'bearer' })
                .expect(404)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 404,
                            message: 'Not Found',
                            path: '/time-slots/b96567d7-a698-4fdc-8ea4-8eed850824e6',
                        }),
                    });
                });
        });
        it('should return "Bad Request" with an incorrect ID', async () => {
            await request(app.getHttpServer())
                .get('/time-slots/undefined')
                // .auth(token, { type: 'bearer' })
                .expect(400)
                .expect(({ body }) => {
                    expect(body).toEqual({
                        error: expect.objectContaining({
                            code: 400,
                            message: 'invalid input syntax for type uuid: "undefined"',
                            path: '/time-slots/undefined',
                        }),
                    });
                });
        });
    });
});
