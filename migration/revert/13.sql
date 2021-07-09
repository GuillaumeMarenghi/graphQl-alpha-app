-- Revert api-graphql:13 from pg

BEGIN;

    ALTER TABLE main.coah 
    DROP COLUMN women_chest,
    DROP COLUMN women_hip,
    DROP COLUMN women_arm,
    DROP COLUMN women_thigh;

COMMIT;
