-- Revert api-graphql:08-add-foreign-key-cus-to-traking from pg

BEGIN;

    ALTER TABLE main.traking DROP COLUMN customer_id;

COMMIT;
