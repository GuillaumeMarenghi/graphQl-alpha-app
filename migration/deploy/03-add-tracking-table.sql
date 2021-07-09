-- Deploy api-graphql:03-add-tracking-table to pg

BEGIN;

CREATE TABLE main.traking (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "ab_origine" TEXT,
    "ab_traffic" TEXT,
    "ab_campagne" TEXT,
    "ab_contenu" TEXT,
    "ct_origine" TEXT,
    "ct_traffic" TEXT,
    "ct_campagne" TEXT,
    "ct_contenu" TEXT,
    "ct_variation" TEXT,
    "clic" TEXT,
    "form" TEXT,
    "split" TEXT,
    "test" TEXT,
    "split_test" TEXT,
    "prospect_id" INT NOT NULL REFERENCES main."prospect"("id")
);

COMMIT;
