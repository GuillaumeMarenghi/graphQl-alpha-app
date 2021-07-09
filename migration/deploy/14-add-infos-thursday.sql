-- Deploy api-graphql:14-add-infos-thursday to pg

BEGIN;

    ALTER TABLE main.thursday
    ADD COLUMN phase_week INT,
    ADD COLUMN tall INT,
    ADD COLUMN menstruation BOOLEAN;

    CREATE TABLE main.thursday_pdc (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "pompes_level" INT,
    "pompes_rep_1" INT,
    "pompes_rep_2" INT,
    "pompes_rep_3" INT,
    "jambes_level" INT,
    "jambes_rep_1" INT,
    "jambes_rep_2" INT,
    "jambes_rep_3" INT,
    "tractions_level" INT,
    "tractions_rep_1" INT,
    "tractions_rep_2" INT,
    "tractions_rep_3" INT,
    "abdo_level" INT,
    "abdo_rep_1" INT,
    "abdo_rep_2" INT,
    "abdo_rep_3" INT,
    "fesses_level" INT,
    "fesses_rep_1" INT,
    "fesses_rep_2" INT,
    "fesses_rep_3" INT,
    "thursday_id" INT NOT NULL REFERENCES main."thursday"("id")
    );

    CREATE TABLE main.thursday_salle (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "squat_level" FLOAT(2),
    "squat_rep_1" INT,
    "squat_rep_2" INT,
    "squat_rep_3" INT,
    "dev_inc_level" FLOAT(2),
    "dev_inc_rep_1" INT,
    "dev_inc_rep_2" INT,
    "dev_inc_rep_3" INT,
    "dev_mili_level" FLOAT(2),
    "dev_mili_rep_1" INT,
    "dev_mili_rep_2" INT,
    "dev_mili_rep_3" INT,
    "sdt_level" FLOAT(2),
    "sdt_rep_1" INT,
    "sdt_rep_2" INT,
    "sdt_rep_3" INT,
    "row_pend_level" FLOAT(2),
    "row_pend_rep_1" INT,
    "row_pend_rep_2" INT,
    "row_pend_rep_3" INT,
    "tractions_level" FLOAT(2),
    "tractions_rep_1" INT,
    "tractions_rep_2" INT,
    "tractions_rep_3" INT,
    "abdo_level" FLOAT(2),
    "abdo_rep_1" INT,
    "abdo_rep_2" INT,
    "abdo_rep_3" INT,
    "hip_trust_level" FLOAT(2),
    "hip_trust_rep_1" INT,
    "hip_trust_rep_2" INT,
    "hip_trust_rep_3" INT,
    "fentes_level" FLOAT(2),
    "fentes_rep_1" INT,
    "fentes_rep_2" INT,
    "fentes_rep_3" INT,
    "tir_h_level" FLOAT(2),
    "tir_h_rep_1" INT,
    "tir_h_rep_2" INT,
    "tir_h_rep_3" INT,
    "thursday_id" INT NOT NULL REFERENCES main."thursday"("id")
    );

COMMIT;
