-- Deploy api-graphql:09-insert-28DC-in-bdd to pg

BEGIN;

    INSERT INTO main."product" ("name") VALUES 
        ('28 day challenge');

COMMIT;
