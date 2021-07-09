-- Revert api-graphql:09-insert-28DC-in-bdd from pg

BEGIN;

    DELETE FROM main.product WHERE name='28 day challenge';

COMMIT;
