-- Revert api-graphql:06-add-column-sexe from pg

BEGIN;

ALTER TABLE main.prospect DROP sexe ;

COMMIT;
