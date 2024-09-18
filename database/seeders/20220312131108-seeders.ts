'use strict';

import dayjs from 'dayjs';

export async function up(queryInterface: any) {
    // Seed data for user table
    await queryInterface.bulkInsert('user', [
        {
            id: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            email: 'admin@keneyasira.com',
            first_name: 'Admin',
            last_name: 'Admin',
            phone: '1234567890',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
            email: 'practician@keneyasira.com',
            first_name: 'Doctor',
            last_name: 'Doctor',
            phone: '9876543210',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            email: 'patient@keneyasira.com',
            first_name: 'Patient',
            last_name: 'Patient',
            phone: '5551234567',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
    ]);

    // Seed data for role table
    await queryInterface.bulkInsert('role', [
        {
            id: '55386193-8051-4853-a0f9-8b6cd37083c7',
            name: 'admin',
            description: 'admin role',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            id: 'dcc71837-5964-409f-b0c7-3ec4d9f3a114',
            name: 'practician',
            description: 'practician role',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            id: '86a41c88-726b-4a69-8774-60a9960cfa09',
            name: 'patient',
            description: 'patient role',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
    ]);

    // Seed data for user_role table
    await queryInterface.bulkInsert('user_role', [
        {
            //admin
            id: '4087a17a-805d-4a6a-a81b-3eb7eb1a9386',
            role_id: '55386193-8051-4853-a0f9-8b6cd37083c7',
            user_id: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            //practician
            id: 'ccdbe78c-3403-4c67-b4f8-c7ac0fe1e05b',
            role_id: 'dcc71837-5964-409f-b0c7-3ec4d9f3a114',
            user_id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            //patient
            id: 'f49a12e6-4f3c-4b24-869d-b54f80db9f61',
            role_id: '86a41c88-726b-4a69-8774-60a9960cfa09',
            user_id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
    ]);

    // Seed data for patient table
    await queryInterface.bulkInsert('patient', [
        {
            id: '632273cc-de99-4582-a440-752ba1f78766',
            birth_date: '1999-01-01',
            user_id: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            created_by: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            updated_by: 'c8581754-69b2-4414-9e9c-4a17fb2022c2',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
    ]);

    // Seed data for specialty table
    await queryInterface.bulkInsert('specialty', [
        {
            id: 'bb045ec3-e2e8-5707-8e4d-f8cfaf7195c1',
            name: 'Cardiology',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
            name: 'Dermatology',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
    ]);

    // Seed data for practician table
    await queryInterface.bulkInsert('practician', [
        {
            id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
            user_id: 'd4581754-69b2-4414-9e9c-4a17fb2022c2',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
    ]);

    // Seed data for practician_has_specialty table
    await queryInterface.bulkInsert('practician_has_specialty', [
        {
            id: '8112162c-e0a2-4f6f-a2c6-14aa72f6bab0',
            practician_id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
            specialty_id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
    ]);

    // Seed data for establishment table
    await queryInterface.bulkInsert('establishment', [
        {
            id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
            name: 'Point G',
            phone: '0022377141319',
            email: 'pointg@keneyasira.com',
            address: 'Rue Kati, Bamako, Mali',
            city: 'Bamako',
            country: 'Mali',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            id: '90b93a53-4109-4182-aa28-d4f3af0b87bb',
            name: 'Gabriel Toure',
            address: 'Av. Van Vollenhoven, Bamako, Mali',
            city: 'Bamako',
            country: 'Mali',
            phone: '0022377141319',
            email: 'gabriel@keneyasira.com',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
    ]);

    // Seed data for establishment_has_practician table
    await queryInterface.bulkInsert('establishment_has_practician', [
        {
            id: 'bfd18657-9f67-4b1e-b171-98c1ff5e91ff',
            establishment_id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
            practician_id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
    ]);

    // Seed data for establishment_has_specialty table
    await queryInterface.bulkInsert('establishment_has_specialty', [
        {
            id: '77a093ae-2d0c-4cac-b8cb-c4bbb035439a',
            establishment_id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
            specialty_id: 'e47e3b25-5399-4272-ab9b-c87c11d20177',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
    ]);

    // Seed data for appointment_status table
    await queryInterface.bulkInsert('appointment_status', [
        {
            id: '186620b3-a831-440d-a4c7-f0ebc90b9d89',
            name: 'scheduled',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            id: 'cc265f80-e8af-4539-bfc2-e83d5cc4f8d3',
            name: 'cancelled',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            id: '665b47d5-5ec3-4199-b3f1-87a9aa71d9e6',
            name: 'completed',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
    ]);

    const year = dayjs().year();
    let month: string | number = dayjs().month() + 1;
    month = month < 10 ? `0${month}` : month;
    const day = dayjs().date() < 10 ? `0${dayjs().date()}` : dayjs().date();
    // seed data for time_slot table
    await queryInterface.bulkInsert('time_slot', [
        {
            id: '091f0895-91c6-4fd0-b638-5db2dd933539',
            available: false,
            practician_id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
            establishment_id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
            start_date: `${year}-${month}-${day} 00:00:00.0`,
            end_date: `${year}-${month}-${day} 01:00:00.0`,
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            id: '4b42301e-0108-46f2-a721-e01dc8c359d2',
            available: true,
            practician_id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
            establishment_id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
            start_date: `${year}-${month}-${day} 01:00:00.0`,
            end_date: `${year}-${month}-${day} 01:30:00.0`,
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            id: '56c63078-c32f-4d04-aa96-5e7815de1f98',
            available: false,
            practician_id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
            establishment_id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
            start_date: `${year}-${month}-${day} 01:30:00.0`,
            end_date: `${year}-${month}-${day} 02:30:00.0`,
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            id: '6a2cb23b-2882-4a02-81c9-ac2d9c72775f',
            available: true,
            practician_id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
            establishment_id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
            start_date: `${year}-${month}-${day} 01:30:00.0`,
            end_date: `${year}-${month}-${day} 02:30:00.0`,
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        // Add more time slots as needed
    ]);

    // seed data for appointment table
    await queryInterface.bulkInsert('appointment', [
        {
            id: '12de8a17-686b-41b4-a1af-53e512ca957c',
            establishment_id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
            practician_id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
            patient_id: '632273cc-de99-4582-a440-752ba1f78766',
            appointment_status_id: '186620b3-a831-440d-a4c7-f0ebc90b9d89', // scheduled
            time_slot_id: '091f0895-91c6-4fd0-b638-5db2dd933539',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            id: '65fc7aa4-6295-49c5-95c0-fb3bcbeaa270',
            establishment_id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
            practician_id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
            patient_id: '632273cc-de99-4582-a440-752ba1f78766',
            appointment_status_id: 'cc265f80-e8af-4539-bfc2-e83d5cc4f8d3', // cancelled
            time_slot_id: '4b42301e-0108-46f2-a721-e01dc8c359d2',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        {
            id: '5d9934de-c5c8-453f-a75d-ece7994dc1f4',
            establishment_id: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
            practician_id: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
            patient_id: '632273cc-de99-4582-a440-752ba1f78766',
            appointment_status_id: '665b47d5-5ec3-4199-b3f1-87a9aa71d9e6', //completed
            time_slot_id: '56c63078-c32f-4d04-aa96-5e7815de1f98',
            created_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            updated_by: 'd7a05755-62d3-4a8e-9ea4-035d9fafd924',
            created_at: '2024-05-20 23:13:00',
            updated_at: '2024-05-20 23:13:00',
        },
        // Add more appointments as needed
    ]);

    // Remember to return, indicating that the migrations were successful
    return Promise.resolve();
}

export async function down(queryInterface: any) {
    // Remove all data from tables during rollback
    await queryInterface.bulkDelete('role', null, {});
    await queryInterface.bulkDelete('user', null, {});
    await queryInterface.bulkDelete('user_role', null, {});
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

    // Remember to return, indicating that the rollback was successful
    return Promise.resolve();
}
