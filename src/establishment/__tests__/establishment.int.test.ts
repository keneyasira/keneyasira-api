import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { EstablishmentService } from '../establishment.service';
import { CreateEstablishmentDto } from '../dtos/create-establishment.dto';
import { UpdateEstablishmentDto } from '../dtos/update-establishment.dto';

describe('EstablishmentController (e2e)', () => {
    let app: INestApplication;
    let establishmentService: EstablishmentService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        establishmentService = moduleFixture.get<EstablishmentService>(EstablishmentService);
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('/establishments (POST)', async () => {
        const createEstablishmentDto: CreateEstablishmentDto = {
            name: 'Test Establishment',
            address: '123 Test St',
            city: 'Test City',
            country: 'Test Country',
            latitude: 17.5797575,
            longitude: -3.998823000000016
        };

        const response = await request(app.getHttpServer())
            .post('/establishments')
            .send(createEstablishmentDto)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(createEstablishmentDto.name);
    });

    it('/establishments (GET)', async () => {
        const response = await request(app.getHttpServer()).get('/establishments').expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    it('/establishments/:id (GET)', async () => {
        const establishment = await establishmentService.create({
            name: 'Test Establishment',
            address: '123 Test St',
            city: 'Test City',
            country: 'Test Country',
        });

        const response = await request(app.getHttpServer())
            .get(`/establishments/${establishment.id}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', establishment.id);
    });

    it('/establishments/:id (PATCH)', async () => {
        const establishment = await establishmentService.create({
            name: 'Test Establishment',
            address: '123 Test St',
            city: 'Test City',
            country: 'Test Country',
        });

        const updateEstablishmentDto: UpdateEstablishmentDto = {
            name: 'Updated Establishment',
        };

        const response = await request(app.getHttpServer())
            .patch(`/establishments/${establishment.id}`)
            .send(updateEstablishmentDto)
            .expect(200);

        expect(response.body).toHaveProperty('name', updateEstablishmentDto.name);
    });

    it('/establishments/:id (DELETE)', async () => {
        const establishment = await establishmentService.create({
            name: 'Test Establishment',
            address: '123 Test St',
            city: 'Test City',
            country: 'Test Country',
        });

        await request(app.getHttpServer())
            .delete(`/establishments/${establishment.id}`)
            .expect(200);

        // Verify the establishment has been deleted
        await request(app.getHttpServer()).get(`/establishments/${establishment.id}`).expect(404);
    });
});
