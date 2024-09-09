import { INestApplication } from '@nestjs/common';
import { execSync } from 'child_process';
import request from 'supertest';

import { getTestingModule } from '../../core/testing';

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
                .get('/time-slot')
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toHaveProperty('data');
                    expect(body).toHaveProperty('total');
                });
        });

        it('should get a time slot', async () => {
            // Assuming a time slot ID exists
            const timeSlotId = 'some-uuid';
            await request(app.getHttpServer())
                .get(`/time-slot/${timeSlotId}`)
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toHaveProperty('id');
                    expect(body).toHaveProperty('startTime');
                    expect(body).toHaveProperty('endTime');
                    expect(body).toHaveProperty('doctorId');
                });
        });

        it('should create a time slot', async () => {
            await request(app.getHttpServer())
                .post('/time-slot')
                .send({
                    startTime: new Date(),
                    endTime: new Date(),
                    doctorId: 'some-doctor-uuid',
                })
                .expect(201)
                .expect(({ body }) => {
                    expect(body).toHaveProperty('id');
                    expect(body).toHaveProperty('startTime');
                    expect(body).toHaveProperty('endTime');
                    expect(body).toHaveProperty('doctorId');
                });
        });

        it('should update a time slot', async () => {
            // Assuming a time slot ID exists
            const timeSlotId = 'some-uuid';
            await request(app.getHttpServer())
                .put(`/time-slot/${timeSlotId}`)
                .send({
                    id: timeSlotId,
                    startTime: new Date(),
                    endTime: new Date(),
                    doctorId: 'some-doctor-uuid',
                })
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toHaveProperty('id');
                    expect(body).toHaveProperty('startTime');
                    expect(body).toHaveProperty('endTime');
                    expect(body).toHaveProperty('doctorId');
                });
        });

        it('should delete a time slot', async () => {
            // Assuming a time slot ID exists
            const timeSlotId = 'some-uuid';
            await request(app.getHttpServer())
                .delete(`/time-slot/${timeSlotId}`)
                .expect(200);
        });
    });
});
