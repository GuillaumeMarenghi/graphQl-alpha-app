-- Deploy api-graphql:17-add-seller-details-and-begining-date to pg

BEGIN;

    ALTER TABLE main.seller ADD activ BOOLEAN;
    ALTER TABLE main.seller ADD start_date TIMESTAMP;
    ALTER TABLE main.seller ADD end_date TIMESTAMP;

    ALTER TABLE main.coach ADD activ BOOLEAN;
    ALTER TABLE main.coach ADD start_date TIMESTAMP;
    ALTER TABLE main.coach ADD end_date TIMESTAMP;

    ALTER TABLE main.sale ADD current_product_start_date TIMESTAMP;

    ALTER TABLE main.product ADD activ BOOLEAN;
    ALTER TABLE main.product ADD start_date TIMESTAMP;
    ALTER TABLE main.product ADD end_date TIMESTAMP;
    ALTER TABLE main.product ADD amount_up_front INT;
    ALTER TABLE main.product ADD first_degressive_amount INT;
    ALTER TABLE main.product ADD second_degressive_amount INT;
    ALTER TABLE main.product ADD gender TEXT;
    ALTER TABLE main.product ADD payment_periodicity TEXT;

    ALTER TABLE main.prospect ADD "seller_id" INT REFERENCES main."seller"("id");

COMMIT;
