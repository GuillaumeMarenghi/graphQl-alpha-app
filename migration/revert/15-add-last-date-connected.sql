-- Revert api-graphql:15-add-last-date-connected from pg

BEGIN;

    ALTER TABLE main.customer DROP last_connection;

COMMIT;
