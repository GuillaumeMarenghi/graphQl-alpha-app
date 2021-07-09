-- Deploy api-graphql:13 to pg

BEGIN;

    ALTER TABLE main.thursday 
    ADD COLUMN women_chest FLOAT(2),
    ADD COLUMN women_hip FLOAT(2),
    ADD COLUMN women_arm FLOAT(2),
    ADD COLUMN women_thigh FLOAT(2);

    INSERT INTO main."coach" ("firstname", "lastname") VALUES
    ('Florent','Hay'),
    ('Julien','Ambroise'),
    ('Nicolas','Berger'),
    ('Michael','Melly'),
    ('Cyril','Munios'),
    ('Thibault','Breant');


COMMIT;
