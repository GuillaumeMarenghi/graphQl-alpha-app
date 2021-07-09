-- Deploy api-graphql:12-add-thuesdayPost-notes-telegram to pg

BEGIN;

    CREATE TABLE main.thursday (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "weight" FLOAT(3),
        "waist" FLOAT(2),
        "kcal" INT,
        "phase" TEXT,
        "week" INT,
        "customer_id" INT NOT NULL REFERENCES main."customer"("id")
    );

    CREATE TABLE main.note (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "content" TEXT NOT NULL,
        "coach_id" INT NOT NULL REFERENCES main."coach"("id"),
        "customer_id" INT NOT NULL REFERENCES main."customer"("id")
    );

    ALTER TABLE main.customer ADD telegram TEXT; 

COMMIT;
