-- Revert api-graphql:04-add-customer-archi from pg

BEGIN;

DROP TABLE main.background;

DROP TABLE main.sale;

DROP TABLE main.customer;

DROP TABLE main.seller;

DROP TABLE main.coach;

DROP TABLE main.product;

COMMIT;
