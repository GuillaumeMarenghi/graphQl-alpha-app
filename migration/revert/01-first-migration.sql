-- Revert api-graphql:01-first-migration from pg

BEGIN;

DROP SCHEMA main;

COMMIT;
