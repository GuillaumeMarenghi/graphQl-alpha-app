-- Revert api-graphql:20-add-liaison-prospect-customer from pg

BEGIN;

        ALTER TABLE main.customer DROP prospect_id;

        ALTER TABLE main.traking DROP date;

COMMIT;
