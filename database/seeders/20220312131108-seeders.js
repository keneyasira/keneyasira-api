'use strict';

import { v4 as uuidv4 } from 'uuid';

export async function up(queryInterface) {
    // Seed data for user_type table
    await queryInterface.bulkInsert('user_type', [
        {
            id: uuidv4(),
            name: 'Admin',
            first_name: 'Admin',
            last_name: 'Admin',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            name: 'Doctor',
            first_name: 'Doctor',
            last_name: 'Doctor',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            name: 'Patient',
            first_name: 'Patient',
            last_name: 'Patient',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);

    // Seed data for user table
    await queryInterface.bulkInsert('user', [
        {
            id: uuidv4(),
            email: 'admin@example.com',
            first_name: 'Admin',
            last_name: 'Admin',
            phone: 1234567890,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            email: 'doctor@example.com',
            first_name: 'Doctor',
            last_name: 'Doctor',
            phone: 9876543210,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            email: 'patient@example.com',
            first_name: 'Patient',
            last_name: 'Patient',
            phone: 5551234567,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);

    // Seed data for patient table
    await queryInterface.bulkInsert('patient', [
        {
            id: uuidv4(),
            user_id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            created_by: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            updated_by: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);

    // Seed data for specialty table
    await queryInterface.bulkInsert('specialty', [
        {
            id: uuidv4(),
            name: 'Cardiology',
            created_by: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            updated_by: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            name: 'Dermatology',
            created_by: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            updated_by: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);

    // Seed data for practician table
    await queryInterface.bulkInsert('practician', [
        {
            id: uuidv4(),
            user_id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
            created_by: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
            updated_by: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);

    // Seed data for practician_has_specialty table
    await queryInterface.bulkInsert('practician_has_specialty', [
        {
            id: uuidv4(),
            practician_id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
            specialty_id: 'f4581754-69b2-4414-9e9c-4a17fb2022c2',
            created_by: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
            updated_by: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);

    // Seed data for establishment table
    await queryInterface.bulkInsert('establishment', [
        {
            id: uuidv4(),
            name: 'Hospital A',
            created_by: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            updated_by: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            name: 'Clinic B',
            created_by: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            updated_by: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);

    // Seed data for establishment_has_practician table
    await queryInterface.bulkInsert('establishment_has_practician', [
        {
            id: uuidv4(),
            establishment_id: 'e4581754-69b2-4414-9e9c-4a17fb2022c2',
            practician_id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
            created_by: 'e4581754-69b2-4414-9e9c-4a17fb2022c2',
            updated_by: 'e4581754-69b2-4414-9e9c-4a17fb2022c2',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);

    // Seed data for establishment_has_specialty table
    await queryInterface.bulkInsert('establishment_has_specialty', [
        {
            id: uuidv4(),
            establishment_id: 'e4581754-69b2-4414-9e9c-4a17fb2022c2',
            specialty_id: 'f4581754-69b2-4414-9e9c-4a17fb2022c2',
            created_by: 'e4581754-69b2-4414-9e9c-4a17fb2022c2',
            updated_by: 'e4581754-69b2-4414-9e9c-4a17fb2022c2',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);

    // Seed data for appointment_status table
    await queryInterface.bulkInsert('appointment_status', [
        {
            id: '1',
            name: 'Scheduled',
            created_by: '1',
            updated_by: '1',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '2',
            name: 'Cancelled',
            created_by: '1',
            updated_by: '1',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '3',
            name: 'Completed',
            created_by: '1',
            updated_by: '1',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);

    // seed data for time_slot table
    await queryInterface.bulkInsert('time_slot', [
        {
            id: '1',
            available: true,
            practician_id: '1',
            establishment_id: '1',
            start_date: new Date(),
            end_date: new Date(),
            created_by: '1',
            updated_by: '1',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '2',
            available: true,
            practician_id: '2',
            establishment_id: '2',
            start_date: new Date(),
            end_date: new Date(),
            created_by: '1',
            updated_by: '1',
            created_at: new Date(),
            updated_at: new Date(),
        },
        // Add more time slots as needed
    ]);

    // seed data for appointment table
    await queryInterface.bulkInsert('appointment', [
        {
            id: '1',
            establishment_id: '1',
            practician_id: '1',
            patient_id: '1',
            appointment_status_id: '1',
            created_by: '1',
            updated_by: '1',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '2',
            establishment_id: '2',
            practician_id: '2',
            patient_id: '2',
            appointment_status_id: '2',
            created_by: '1',
            updated_by: '1',
            created_at: new Date(),
            updated_at: new Date(),
        },
        // Add more appointments as needed
    ]);

    // Remember to return, indicating that the migrations were successful
    return Promise.resolve();
}
export async function down(queryInterface) {
    // Remove all data from tables during rollback
    await queryInterface.bulkDelete('user_type', null, {});
    await queryInterface.bulkDelete('user', null, {});
    await queryInterface.bulkDelete('patient', null, {});
    await queryInterface.bulkDelete('specialty', null, {});
    await queryInterface.bulkDelete('practician', null, {});
    await queryInterface.bulkDelete('establishment', null, {});
    await queryInterface.bulkDelete('establishment_has_practician', null, {});
    await queryInterface.bulkDelete('establishment_has_specialty', null, {});
    await queryInterface.bulkDelete('practician_has_specialty', null, {});
    await queryInterface.bulkDelete('time_slot', null, {});
    await queryInterface.bulkDelete('appointment', null, {});
    await queryInterface.bulkDelete('appointment_status', null, {});
    await queryInterface.bulkDelete('time_slot', null, {});

    // Remember to return, indicating that the rollback was successful
    return Promise.resolve();
}
