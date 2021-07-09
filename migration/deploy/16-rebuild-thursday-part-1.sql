-- Deploy api-graphql:16-rebuild-thursday-part-1 to pg

BEGIN;

    ALTER TABLE main.thursday_pdc ADD pompes_details JSON;
    ALTER TABLE main.thursday_pdc ADD jambes_details JSON;
    ALTER TABLE main.thursday_pdc ADD tractions_details JSON;
    ALTER TABLE main.thursday_pdc ADD abdo_details JSON;
    ALTER TABLE main.thursday_pdc ADD fesses_details JSON;

    ALTER TABLE main.thursday_salle ADD squat_details JSON;
    ALTER TABLE main.thursday_salle ADD dev_inc_details JSON;
    ALTER TABLE main.thursday_salle ADD dev_mili_details JSON;
    ALTER TABLE main.thursday_salle ADD sdt_details JSON;
    ALTER TABLE main.thursday_salle ADD row_pend_details JSON;
    ALTER TABLE main.thursday_salle ADD tractions_details JSON;
    ALTER TABLE main.thursday_salle ADD abdo_details JSON;
    ALTER TABLE main.thursday_salle ADD hip_trust_details JSON;
    ALTER TABLE main.thursday_salle ADD fentes_details JSON;
    ALTER TABLE main.thursday_salle ADD tir_h_details JSON;


COMMIT;
