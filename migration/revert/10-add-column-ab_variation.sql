-- Revert api-graphql:10-add-column-ab_variation from pg

BEGIN;

    ALTER TABLE main.traking DROP ab_variation;

COMMIT;
