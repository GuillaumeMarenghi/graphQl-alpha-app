-- Deploy api-graphql:08-add-foreign-key-cus-to-traking to pg

BEGIN;
  
    ALTER TABLE main.traking ALTER COLUMN prospect_id DROP NOT NULL;

    ALTER TABLE main.traking ADD COLUMN customer_id INT REFERENCES main."customer"("id");

COMMIT;
