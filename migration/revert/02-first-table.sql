-- Revert api-graphql:02-first-table from pg

BEGIN;

DROP TABLE main.prospect;

COMMIT;
