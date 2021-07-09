-- Deploy api-graphql:19-add-price-schema to pg

BEGIN;

    CREATE TABLE main.price (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "amount" INT NOT NULL,
    "degressiv_first" INT,
    "degressiv_second" INT,
    "start_date" TIMESTAMP,
    "end_date" TIMESTAMP,
    "type"TEXT,
    "product_id" INT NOT NULL REFERENCES main.product("id")
);

INSERT INTO main."price" ("amount", "degressiv_first", "degressiv_second", "start_date", "end_date", "type", "product_id") VALUES
    (177,47, null,'2021/01/01', null,'mensuel',1),
    (497,47, null,'2021/01/01', null,'trimestriel',1),
    (177,47, null,'2019/08/01', '2020/04/09','mensuel',1),
    (497,47, null,'2019/08/01', '2020/04/09','trimestriel',1),
    (127,97, 77,'2019/10/22', '2020/12/31','mensuel',1),
    (347,297, 247,'2019/10/22', '2020/12/31','trimestriel',1),
    (100,47, null,'2019/08/31', '2019/10/21','mensuel',1),
    (270,117, null,'2019/08/31', '2019/10/21','trimestriel',1),
    (297,null, null,null, '2018/07/01','unique',1),
    (497,47, null,null, '2019/02/05','trimestriel',1),
    (177,null, null,null, '2018/07/01','unique',1),
    (29,null,null,null, null, null,1),
    (177,47, null,'2021/01/01', null,'mensuel',2),
    (497,47, null,'2021/01/01', null,'trimestriel',2),
    (347,297,247,'2021/01/01', null,'mensuel',3),
    (897,747, 687,'2021/01/01', null,'trimestriel',3),
    (3000,2000, null,'2021/01/01', null,'annuel',3), 
    (347,297,247,'2020/01/14', '2020/12/31','mensuel',3),
    (897,747, 697,'2020/01/14', '2020/12/31','trimestriel',3),
    (1997,null, null,'2020/01/14', '2020/04/08','annuel',3), 
    (3000,2000, null,'2020/04/09', '2020/12/31','annuel',3), 
    (247,197,147,'2019/10/22', '2020/01/13','mensuel',3),
    (597,547, 397,'2019/10/22', '2020/01/13','trimestriel',3),
    (1497,1297, 1197,'2019/10/22', '2020/01/13','annuel',3), 
    (197,null,null,'2019/02/05', '2019/10/03','mensuel',3),
    (597,197, null,'2019/02/05', '2019/10/03','trimestriel',3),
    (1197,null, null,'2019/02/05', '2019/10/03','annuel',3), 
    (897,157, null, null, '2019/02/05','trimestriel',3),
    (347,157, null, null, '2019/02/05','mensuel',3),
    (347,297,247,'2021/01/01', null,'mensuel',4),
    (897,747, 687,'2021/01/01', null,'trimestriel',4),
    (3000,2000, null,'2021/01/01', null,'annuel',4), 
    (1997,null, null,'2020/01/14', '2020/04/08','annuel',4), 
    (247,197,147,'2019/10/22', '2020/01/13','mensuel',4),
    (597,547, 397,'2019/10/22', '2020/01/13','trimestriel',4),
    (1497,1297, 1197,'2019/10/22', '2020/01/13','annuel',4), 
    (547,197,null,'2019/02/05', '2019/10/03','mensuel',4),
    (597,197,null,'2019/02/05', '2019/10/03','trimestriel',4),
    (1997,null,null,'2019/02/05', '2019/10/03','annuel',4);

    ALTER TABLE main.customer ADD price_id INT REFERENCES main.price("id");




COMMIT;
