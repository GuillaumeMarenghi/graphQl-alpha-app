-- Revert api-graphql:03-add-tracking-table from pg

BEGIN;

DROP TABLE main.traking;

COMMIT;
