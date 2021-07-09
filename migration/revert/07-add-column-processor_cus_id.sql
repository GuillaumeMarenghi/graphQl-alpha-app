-- Revert api-graphql:07-add-column-processor_cus_id from pg

BEGIN;

ALTER TABLE main.sale DROP processor_cus_id;

COMMIT;
