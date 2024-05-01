CREATE TABLE "user_type" (
  "id" uuid PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "user" (
  "id" uuid PRIMARY KEY,
  "user_type_id" uuid,
  "email" varchar,
  "password" varchar,
  "first_name" varchar,
  "last_name" varchar,
  "phone" number,
  "created_at" datetime,
  "updated_at" datetime,
  "delete_at" datetime,
  "created_by" uuid,
  "updated_by" uuid,
  "delete_by" uuid
);

CREATE TABLE "patient" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "created_at" datetime,
  "updated_at" datetime,
  "delete_at" datetime,
  "created_by" uuid,
  "updated_by" uuid,
  "delete_by" uuid
);

CREATE TABLE "specialty" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "created_at" datetime,
  "updated_at" datetime,
  "delete_at" datetime,
  "created_by" uuid,
  "updated_by" uuid,
  "delete_by" uuid
);

CREATE TABLE "practician" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "created_at" datetime,
  "updated_at" datetime,
  "delete_at" datetime,
  "created_by" uuid,
  "updated_by" uuid,
  "delete_by" uuid
);

CREATE TABLE "practician_has_specialty" (
  "id" uuid PRIMARY KEY,
  "practician_id" uuid,
  "specialty_id" uuid
);

CREATE TABLE "establishment" (
  "id" uuid PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "establishment_has_practician" (
  "id" uuid PRIMARY KEY,
  "establishment_id" uuid,
  "practician_id" uuid
);

CREATE TABLE "establishment_has_specialty" (
  "id" uuid PRIMARY KEY,
  "establishment_id" uuid,
  "specialty_id" uuid
);

CREATE TABLE "time_slot" (
  "id" uuid PRIMARY KEY,
  "available" boolean,
  "practician_id" uuid,
  "establishment_id" uuid,
  "start_date" datetime,
  "end_date" datetime,
  "created_at" datetime,
  "delete_at" datetime,
  "created_by" uuid,
  "delete_by" uuid
);

CREATE TABLE "appointment" (
  "id" uuid,
  "establishment_id" uuid,
  "practician_id" uuid,
  "patient_id" uuid,
  "start_at" datetime,
  "end_at" datetime,
  "status" uuid
);

CREATE TABLE "status" (
  "id" uuid,
  "name" varchar
);

COMMENT ON COLUMN "specialty"."name" IS 'dermatology/genycology/etc...';

COMMENT ON COLUMN "status"."name" IS 'waiting_for_approval, confirmed, completed';

ALTER TABLE "user" ADD FOREIGN KEY ("user_type_id") REFERENCES "user_type" ("id");

ALTER TABLE "establishment_has_specialty" ADD FOREIGN KEY ("establishment_id") REFERENCES "establishment" ("id");

ALTER TABLE "establishment_has_specialty" ADD FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("id");

ALTER TABLE "establishment_has_practician" ADD FOREIGN KEY ("establishment_id") REFERENCES "establishment" ("id");

ALTER TABLE "establishment_has_practician" ADD FOREIGN KEY ("practician_id") REFERENCES "practician" ("id");

ALTER TABLE "time_slot" ADD FOREIGN KEY ("practician_id") REFERENCES "practician" ("id");

ALTER TABLE "time_slot" ADD FOREIGN KEY ("establishment_id") REFERENCES "establishment" ("id");

ALTER TABLE "practician_has_specialty" ADD FOREIGN KEY ("practician_id") REFERENCES "practician" ("id");

ALTER TABLE "practician_has_specialty" ADD FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("id");

ALTER TABLE "practician" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "appointment" ADD FOREIGN KEY ("practician_id") REFERENCES "practician" ("id");

ALTER TABLE "appointment" ADD FOREIGN KEY ("patient_id") REFERENCES "patient" ("id");

ALTER TABLE "appointment" ADD FOREIGN KEY ("establishment_id") REFERENCES "establishment" ("id");

ALTER TABLE "patient" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");