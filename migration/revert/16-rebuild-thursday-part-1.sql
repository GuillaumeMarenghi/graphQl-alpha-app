-- Revert api-graphql:16-rebuild-thursday-part-1 from pg

BEGIN;

    ALTER TABLE main.thursday_pdc DROP pompes_details;
    ALTER TABLE main.thursday_pdc DROP jambes_details;
    ALTER TABLE main.thursday_pdc DROP tractions_details;
    ALTER TABLE main.thursday_pdc DROP abdo_details;
    ALTER TABLE main.thursday_pdc DROP fesses_details;

    ALTER TABLE main.thursday_salle DROP squat_details;
    ALTER TABLE main.thursday_salle DROP dev_inc_details;
    ALTER TABLE main.thursday_salle DROP dev_mili_details;
    ALTER TABLE main.thursday_salle DROP sdt_details;
    ALTER TABLE main.thursday_salle DROP row_pend_details;
    ALTER TABLE main.thursday_salle DROP tractions_details;
    ALTER TABLE main.thursday_salle DROP abdo_details;
    ALTER TABLE main.thursday_salle DROP hip_trust_details;
    ALTER TABLE main.thursday_salle DROP fentes_details;
    ALTER TABLE main.thursday_salle DROP tir_h_details;

COMMIT;
