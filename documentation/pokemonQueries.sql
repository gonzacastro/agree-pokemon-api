create database pokemon;
use pokemon;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
flush privileges;

#-----------------------

create table expansion_pack(
id  INT AUTO_INCREMENT,
name varchar(50) NOT NULL,
UNIQUE KEY(name),
PRIMARY KEY(id)
);
INSERT INTO expansion_pack(name)
VALUES
('Base Set'),
('Jungle'),
('Fossile'),
('Base Set 2');
SELECT  * FROM expansion_pack ORDER BY ID ASC;
DROP TABLE expansion_pack;

#-----------------------

CREATE TABLE type (
id  INT AUTO_INCREMENT,
name varchar(50) NOT NULL,
UNIQUE KEY(name),
PRIMARY KEY(id)
);
INSERT INTO type(name)
VALUES
('Electric'),
('Water'),
('Fire'),
('Grass'),
('Normal');
SELECT  * FROM type ORDER BY ID ASC;
DROP TABLE type;

#-----------------------

CREATE TABLE rarity (
id  INT AUTO_INCREMENT,
name varchar(50) NOT NULL,
UNIQUE KEY(name),
PRIMARY KEY(id)
);
INSERT INTO rarity(name)
VALUES
('Common'),
('Uncommon'),
('Rare'),
('Shiny');
SELECT  * FROM rarity ORDER BY ID ASC;
DROP TABLE rarity;

#-----------------------
CREATE TABLE card (
id  INT AUTO_INCREMENT,
name varchar(50) NOT NULL,
hp INT NOT NULL,
first_edition BOOL NOT NULL,
id_expansion_pack INT NOT NULL,
id_type INT NOT NULL,
id_rarity INT NOT NULL,
price DECIMAL(8,2) NOT NULL,
image varchar(100) NOT NULL,
created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY(id),
UNIQUE KEY(name),
FOREIGN KEY(id_expansion_pack) REFERENCES expansion_pack(id),
FOREIGN KEY(id_type) REFERENCES type(id),
FOREIGN KEY(id_rarity) REFERENCES rarity(id)
);
INSERT INTO card(
	name,
    hp,
    first_edition,
    id_expansion_pack,
    id_type,
    id_rarity,
    price,
    image
)
VALUES
('Squirtle', 100, TRUE, 1, 1, 1, 1000, 'https://m.media-amazon.com/images/I/51Kn3IbjTaL._AC_.jpg'),
('Charmander', 100, TRUE, 1, 2, 1, 900, 'https://m.media-amazon.com/images/I/51P535wVegL._AC_.jpg'),
('Bulbasaur', 90, TRUE, 2, 3, 1, 800, 'https://m.media-amazon.com/images/I/51aao-rlYwL._AC_.jpg');
SELECT * FROM card ORDER BY ID ASC;
DROP TABLE card;