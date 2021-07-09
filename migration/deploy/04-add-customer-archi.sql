-- Deploy api-graphql:04-add-customer-archi to pg
BEGIN;

CREATE TABLE main.product (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
);

CREATE TABLE main.coach (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT,
    "tel" TEXT
);

CREATE TABLE main.seller (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT,
    "tel" TEXT
);

CREATE TABLE main.customer (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "dateofbirth" TIMESTAMP,
    "tel" TEXT,
    "activ" BOOLEAN,
    "annulation" BOOLEAN,
    "created_at" TIMESTAMP,
    "updated_at" TIMESTAMP,
    "coach_id" INT REFERENCES main."coach"("id"),
    "seller_id" INT REFERENCES main."seller"("id"),
    "product_id" INT NOT NULL REFERENCES main."product"("id")
);

CREATE TABLE main.sale (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "type" TEXT NOT NULL,
    "processor" TEXT,
    "amount_up_front" INT NOT NULL,
    "amount_total" INT,
    "next_term" TIMESTAMP,
    "number_of_payments" INT,
    "detail" JSON, 
    "customer_id" INT NOT NULL REFERENCES main."customer"("id")
);

CREATE TABLE main.background (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" TIMESTAMP NOT NULL,
    "customer_id" INT NOT NULL REFERENCES main."customer"("id"),
    "product_id" INT NOT NULL REFERENCES main."product"("id")
);

COMMIT;
