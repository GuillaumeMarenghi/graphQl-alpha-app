-- Deploy api-graphql:06-add-column-sexe to pg

BEGIN;

ALTER TABLE main.prospect ADD sexe TEXT;

COMMIT;
