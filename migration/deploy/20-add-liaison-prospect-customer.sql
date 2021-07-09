-- Deploy api-graphql:20-add-liaison-prospect-customer to pg

BEGIN;

        ALTER TABLE main.customer ADD prospect_id INT REFERENCES main.prospect("id");

        ALTER TABLE main.traking ADD date TIMESTAMP;

COMMIT;
