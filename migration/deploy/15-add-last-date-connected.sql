-- Deploy api-graphql:15-add-last-date-connected to pg

BEGIN;

    ALTER TABLE main.customer ADD last_connection TIMESTAMP;

    INSERT INTO main."seller" ("firstname", "lastname") VALUES
    ('Arches', 'Vanina');

COMMIT;
