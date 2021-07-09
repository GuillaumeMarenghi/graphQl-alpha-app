-- Deploy api-graphql:18-add-constraint-unique-index-email to pg

BEGIN;

    CREATE UNIQUE INDEX index_email_customer
    ON main.customer(email);

COMMIT;
