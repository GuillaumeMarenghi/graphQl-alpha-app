-- Revert api-graphql:05-add-insert-data from pg

BEGIN;

TRUNCATE TABLE main."seller" CASCADE;
TRUNCATE TABLE main."coach" CASCADE;
TRUNCATE TABLE main."product" CASCADE;

COMMIT;
