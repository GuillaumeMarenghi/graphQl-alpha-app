-- Revert api-graphql:14-add-infos-thursday from pg

BEGIN;

    ALTER TABLE main.thursday DROP COLUMN phase_week;
    ALTER TABLE main.thursday DROP COLUMN tall;
    ALTER TABLE main.thursday DROP COLUMN menstruation;

    DROP TABLE main.thursday_pdc;

    DROP TABLE main.thursday_salle;


COMMIT;
