-- Revert api-graphql:19-add-price-schema from pg

BEGIN;

    TRUNCATE TABLE main."price";
    DROP TABLE main.price;
    ALTER TABLE main.customer DROP price_id;

COMMIT;
