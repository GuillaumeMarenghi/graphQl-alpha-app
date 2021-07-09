-- Deploy api-graphql:05-add-insert-data to pg

BEGIN;

INSERT INTO main."seller" ("firstname", "lastname") VALUES
    ('Hedi','Alphabody'),
    ('Thomas','Toursel'),
    ('Farid','Amziane'),
    ('Raphael','Hamy'),
    ('Romain','Trigon'),
    ('Anthony','Kourchniroff'),
    ('Patrick','Jackson'),
    ('Dalila','Rafasse'),
    ('Arnold','Dubus'),
    ('Sandra','Belharet'),
    ('Anthony', 'Berthault'),
    ('Bruno', 'Thomas');

INSERT INTO main."coach" ("firstname", "lastname") VALUES
    ('Georgy','Roks'),
    ('Vincent','Danel'),
    ('Théo','Chahine'),
    ('David','Santos'),
    ('Seb','Beguin'),
    ('Fabio','Latragna'),
    ('Christophe','Meersman'),
    ('Jean-Marc','Le Caribou'),
    ('Seb','Buchon'),
    ('Adrien','Depret'),
    ('Max','Catu'),
    ('Gaetan','Brice'),
    ('Christopher','Nolan'),
    ('Christophe','Wailune'),
    ('Pascal','Galodé'),
    ('Mikael','Sagnol'),
    ('Tony','Rodrigues'),
    ('Christophe','Cascales'),
    ('Laurent','Wassmuth'),
    ('Thomas','Berlette'),
    ('Patrick','Wastiaux'),
    ('Dimitri','Rorteau'),
    ('Cedric','Le Jean'),
    ('Olivier','Chastel'),
    ('Pierre','Bouzard');

INSERT INTO main."product" ("name") VALUES 
    ('formation homme'),
    ('formation femme'),
    ('VIP homme'),
    ('VIP femme');
    

COMMIT;
