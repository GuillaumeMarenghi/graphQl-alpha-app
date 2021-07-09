-- Revert api-graphql:12-add-thuesdayPost-notes-telegram from pg

BEGIN;

    ALTER TABLE main.customer DROP telegram;

    DROP TABLE main.notes;

    DROP TABLE main.thursday;

COMMIT;
