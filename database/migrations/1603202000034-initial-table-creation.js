module.exports = {
    up: (queryInterface) =>
        queryInterface.sequelize.query(`

    CREATE TABLE IF NOT EXISTS "user" (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        email varchar NOT NULL,
        first_name varchar NOT NULL,
        last_name varchar NOT NULL,
        phone varchar(20) NOT NULL,
        created_by uuid NULL,
        updated_by uuid NULL,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        deleted_at timestamptz NULL,
        deleted_by uuid NULL,
        CONSTRAINT "user_pk" PRIMARY KEY (id),
        CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT updated_by_fk FOREIGN KEY (updated_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT deleted_by_fk FOREIGN KEY (deleted_by) REFERENCES "user"(id) ON DELETE CASCADE
    );


    CREATE TABLE IF NOT EXISTS "role" (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        name varchar NOT NULL,
        description varchar NOT NULL,
        created_by uuid NULL,
        updated_by uuid NULL,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        deleted_at timestamptz NULL,
        deleted_by uuid NULL,
        CONSTRAINT "role_pk" PRIMARY KEY (id),
        CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT updated_by_fk FOREIGN KEY (updated_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT deleted_by_fk FOREIGN KEY (deleted_by) REFERENCES "user"(id) ON DELETE CASCADE
    );


    CREATE TABLE IF NOT EXISTS "user_role" (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        user_id uuid NOT NULL,
        role_id uuid NOT NULL,
        created_by uuid NULL,
        updated_by uuid NULL,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        deleted_at timestamptz NULL,
        deleted_by uuid NULL,
        CONSTRAINT "user_has_role_pk" PRIMARY KEY (id),
        CONSTRAINT "user_fk" FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT "role_fk" FOREIGN KEY (role_id) REFERENCES "role"(id) ON DELETE CASCADE,
        CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT updated_by_fk FOREIGN KEY (updated_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT deleted_by_fk FOREIGN KEY (deleted_by) REFERENCES "user"(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS patient (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        birth_date date NOT NULL,
        user_id uuid NOT NULL,
        created_by uuid NULL,
        updated_by uuid NULL,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        deleted_at timestamptz NULL,
        deleted_by uuid NULL,
        CONSTRAINT "patient_pk" PRIMARY KEY (id),
        CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT updated_by_fk FOREIGN KEY (updated_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT deleted_by_fk FOREIGN KEY (deleted_by) REFERENCES "user"(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS specialty (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        name varchar NOT NULL,
        created_by uuid NULL,
        updated_by uuid NULL,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at timestamptz  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        deleted_at timestamptz NULL,
        deleted_by uuid NULL,
        CONSTRAINT "specialty_pk" PRIMARY KEY (id),
        CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT updated_by_fk FOREIGN KEY (updated_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT deleted_by_fk FOREIGN KEY (deleted_by) REFERENCES "user"(id) ON DELETE CASCADE
    );


    CREATE TABLE IF NOT EXISTS practician (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        user_id uuid NOT NULL,
        created_by uuid NULL,
        updated_by uuid NULL,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        deleted_at timestamptz NULL,
        deleted_by uuid NULL,
        CONSTRAINT "practician_pk" PRIMARY KEY (id),
        CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT updated_by_fk FOREIGN KEY (updated_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT deleted_by_fk FOREIGN KEY (deleted_by) REFERENCES "user"(id) ON DELETE CASCADE
    );


    CREATE TABLE IF NOT EXISTS practician_has_specialty (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        practician_id uuid NOT NULL,
        specialty_id uuid NOT NULL,
        created_by uuid NULL,
        updated_by uuid NULL,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        deleted_at timestamptz NULL,
        deleted_by uuid NULL,
        CONSTRAINT "practician_has_specialty_pk" PRIMARY KEY (id),
        CONSTRAINT "practician_fk" FOREIGN KEY (practician_id) REFERENCES "practician"(id),
        CONSTRAINT "specialty_fk" FOREIGN KEY (specialty_id) REFERENCES "specialty"(id),
        CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT updated_by_fk FOREIGN KEY (updated_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT deleted_by_fk FOREIGN KEY (deleted_by) REFERENCES "user"(id) ON DELETE CASCADE

    );


    CREATE TABLE IF NOT EXISTS establishment (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        name varchar NOT NULL,
        created_by uuid NULL,
        updated_by uuid NULL,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        deleted_at timestamptz NULL,
        deleted_by uuid NULL,
        CONSTRAINT "establishment_pk" PRIMARY KEY (id),
        CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT updated_by_fk FOREIGN KEY (updated_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT deleted_by_fk FOREIGN KEY (deleted_by) REFERENCES "user"(id) ON DELETE CASCADE

    );

    CREATE TABLE IF NOT EXISTS establishment_has_practician (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        establishment_id uuid NOT NULL,
        practician_id uuid NOT NULL,
        created_by uuid NULL,
        updated_by uuid NULL,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        deleted_at timestamptz NULL,
        deleted_by uuid NULL,
        CONSTRAINT "establishment_has_practician_pk" PRIMARY KEY (id),
        CONSTRAINT "establishment_fk" FOREIGN KEY (establishment_id) REFERENCES "establishment"(id),
        CONSTRAINT "practician_fk" FOREIGN KEY (practician_id) REFERENCES "practician"(id),
        CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT updated_by_fk FOREIGN KEY (updated_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT deleted_by_fk FOREIGN KEY (deleted_by) REFERENCES "user"(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS establishment_has_specialty (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        establishment_id uuid NOT NULL,
        specialty_id uuid NOT NULL,
        created_by uuid NULL,
        updated_by uuid NULL,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        deleted_at timestamptz NULL,
        deleted_by uuid NULL,
        CONSTRAINT "establishment_has_specialty_pk" PRIMARY KEY (id),
        CONSTRAINT "establishment_fk" FOREIGN KEY (establishment_id) REFERENCES "establishment"(id),
        CONSTRAINT "specialty_fk" FOREIGN KEY (specialty_id) REFERENCES "specialty"(id),
        CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT updated_by_fk FOREIGN KEY (updated_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT deleted_by_fk FOREIGN KEY (deleted_by) REFERENCES "user"(id) ON DELETE CASCADE
    );


    CREATE TABLE  IF NOT EXISTS time_slot (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        available boolean NOT NULL,
        practician_id uuid NOT NULL,
        establishment_id uuid NOT NULL,
        start_date timestamptz NOT NULL,
        end_date timestamptz NOT NULL,
        created_by uuid NULL,
        updated_by uuid NULL,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        deleted_at timestamptz NULL,
        deleted_by uuid NULL,
        CONSTRAINT "time_slot_pk" PRIMARY KEY (id),
        CONSTRAINT "practician_fk" FOREIGN KEY (practician_id) REFERENCES "practician"(id),
        CONSTRAINT "establishment_fk" FOREIGN KEY (establishment_id) REFERENCES "establishment"(id),
        CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT updated_by_fk FOREIGN KEY (updated_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT deleted_by_fk FOREIGN KEY (deleted_by) REFERENCES "user"(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS appointment_status (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        name varchar NOT NULL,
        created_by uuid NULL,
        updated_by uuid NULL,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        deleted_at timestamptz NULL,
        deleted_by uuid NULL,
        CONSTRAINT "appointment_status_pk" PRIMARY KEY (id),
        CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT updated_by_fk FOREIGN KEY (updated_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT deleted_by_fk FOREIGN KEY (deleted_by) REFERENCES "user"(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS appointment (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        establishment_id uuid NOT NULL,
        practician_id uuid NOT NULL,
        patient_id uuid NOT NULL,
        appointment_status_id uuid NOT NULL,
        time_slot_id uuid NOT NULL,
        created_by uuid NULL,
        updated_by uuid NULL,
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at timestamptz NULL,
        deleted_at timestamptz NULL,
        deleted_by uuid NULL,
        CONSTRAINT "appointment_pk" PRIMARY KEY (id),
        CONSTRAINT "establishment_fk" FOREIGN KEY (establishment_id) REFERENCES "establishment"(id),
        CONSTRAINT "practician_fk" FOREIGN KEY (practician_id) REFERENCES "practician"(id),
        CONSTRAINT "patient_fk" FOREIGN KEY (patient_id) REFERENCES "patient"(id),
        CONSTRAINT "appointment_status_fk" FOREIGN KEY (appointment_status_id) REFERENCES "appointment_status"(id),
        CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT updated_by_fk FOREIGN KEY (updated_by) REFERENCES "user"(id) ON DELETE CASCADE,
        CONSTRAINT deleted_by_fk FOREIGN KEY (deleted_by) REFERENCES "user"(id) ON DELETE CASCADE

    );
    
    `),
    down: (queryInterface) =>
        queryInterface.sequelize.query(
            'drop table user cascade;',
            'drop table role cascade;',
            'drop table user_role cascade;',
            'drop table patient cascade;',
            'drop table specialty cascade;',
            'drop table practician cascade;',
            'drop table establishment cascade;',
            'drop table establishment_has_practician cascade;',
            'drop table establishment_has_specialty cascade;',
            'drop table practician_has_specialty cascade;',
            'drop table time_slot cascade;',
            'drop table appointment cascade;',
            'drop table appointment_status cascade;',
        ),
};
