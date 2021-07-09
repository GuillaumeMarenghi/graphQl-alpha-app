-- Deploy api-graphql:02-first-table to pg

BEGIN;

CREATE TABLE main.prospect (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "age" INT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "date" TIMESTAMPTZ NOT NULL,
    "objectif" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "invest" TEXT NOT NULL
);

COMMIT;
