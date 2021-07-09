-- Deploy api-graphql:11-add-password-at-coach to pg

BEGIN;

    ALTER TABLE main.coach ADD password TEXT;

COMMIT;
