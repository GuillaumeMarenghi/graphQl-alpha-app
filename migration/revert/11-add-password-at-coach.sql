-- Revert api-graphql:11-add-password-at-coach from pg

BEGIN;

    ALTER TABLE main.coach DROP password;

COMMIT;
