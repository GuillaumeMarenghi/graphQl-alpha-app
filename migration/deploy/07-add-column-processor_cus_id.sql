-- Deploy api-graphql:07-add-column-processor_cus_id to pg

BEGIN;

ALTER TABLE main.sale ADD processor_cus_id TEXT;

COMMIT;
