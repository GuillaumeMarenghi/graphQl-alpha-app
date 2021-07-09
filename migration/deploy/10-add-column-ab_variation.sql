-- Deploy api-graphql:10-add-column-ab_variation to pg

BEGIN;

    ALTER TABLE main.traking ADD ab_variation TEXT;

COMMIT;
