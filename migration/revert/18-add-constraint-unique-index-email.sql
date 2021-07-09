-- Revert api-graphql:18-add-constraint-unique-index-email from pg

BEGIN;

    ALTER TABLE main.customer
    DROP CONSTRAINT index_email_customer;

COMMIT;
