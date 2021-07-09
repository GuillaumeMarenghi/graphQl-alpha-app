-- Revert api-graphql:17-DROP-seller-details-and-begining-date from pg

BEGIN;

    ALTER TABLE main.seller DROP activ;
    ALTER TABLE main.seller DROP start_date;
    ALTER TABLE main.seller DROP end_date;

    ALTER TABLE main.coach DROP activ;
    ALTER TABLE main.coach DROP start_date;
    ALTER TABLE main.coach DROP end_date;

    ALTER TABLE main.sale DROP current_product_start_date;

    ALTER TABLE main.product DROP activ;
    ALTER TABLE main.product DROP start_date;
    ALTER TABLE main.product DROP end_date;
    ALTER TABLE main.product DROP amount_up_front;
    ALTER TABLE main.product DROP first_degressive_amount;
    ALTER TABLE main.product DROP second_degressive_amount;
    ALTER TABLE main.product DROP gender;
    ALTER TABLE main.product DROP payment_periodicity;

    ALTER TABLE main.prospect DROP "seller_id";

COMMIT;
