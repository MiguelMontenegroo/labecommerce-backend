-- Active: 1689000394415@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

SELECT * FROM users;

PRAGMA table_info("users");

INSERT INTO users (id, name, email, password, created_at)
VALUES ("u003", "Ziclano", "ziclano@gmail.com", "ziclano123", datetime('now'));

INSERT INTO users (id, name, email, password, created_at)
VALUES ("u004", "Beltrano", "beltrano@gmail.com", "beltrano123", datetime('now'));

INSERT INTO users (id, name, email, password, created_at)
VALUES ("u005", "Miliano", "miliano@gmail.com", "miliano123", datetime('now'));

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products (id, name, price, description, image_url)
VALUES ("prod003", "mousepad", 25, "mousepad gamer", "https://picsum.photos/seed/Mousepad/400");

INSERT INTO products (id, name, price, description, image_url)
VALUES ("prod004", "headset", 350, "headset gamer", "https://picsum.photos/seed/Headset/400");

INSERT INTO products (id, name, price, description, image_url)
VALUES ("prod005", "CPU gamer", 10000, "cpu gamer i5", "https://picsum.photos/seed/cpu/400");

INSERT INTO products (id, name, price, description, image_url)
VALUES ("prod006", "Monitor 144hz", 2500, "monitor 144hz", "https://picsum.photos/seed/Monitor/400");

INSERT INTO products (id, name, price, description, image_url)
VALUES ("prod007", "Mouse gamer 12000 dpi", 600, "mouse gamer", "https://picsum.photos/seed/Mouse/400");

INSERT INTO products (id, name, price, description, image_url)
VALUES ("prod008", "estabilizador", 800, "estabilizador no break", "https://picsum.photos/seed/Estabilizador/400");

-- get all users
SELECT * FROM users;

-- get all products
SELECT * FROM products;

-- get all products funcionalidade 2
SELECT * FROM products
WHERE name LIKE "%gamer%";

-- create product
INSERT INTO products (id, name, price, description, image_url)
VALUES ("prod008", "estabilizador", 800, "estabilizador no break", "https://picsum.photos/seed/Estabilizador/400");

-- create user
INSERT INTO users (id, name, email, password, created_at)
VALUES ("u005", "Miliano", "miliano@gmail.com", "miliano123", datetime('now'));

-- delete user by id
DELETE FROM users
WHERE id = "u005";

-- delete product by id
DELETE FROM products
WHERE id = "prod008";

-- edit product by id
UPDATE products
SET name = "estabilizador gamer",
price = 1200,
description = "estabilizador gamer no break",
image_url = "https://picsum.photos/seed/Estabilizador/400"
WHERE id = "prod008";

-- edit users by id 
UPDATE users
SET name = "miliano cris",
email = "milianocris@gmail.com",
password = "milianocris"
WHERE id = "u005";

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users (id)
     ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO purchases (id, buyer, total_price, created_at)
VALUES ('p001', 'u005', 10000, datetime('now') ),
('p002', 'u004', 5000, datetime('now'));


INSERT INTO purchases (id , buyer, total_price, created_at)
VALUES('p003', 'u003', 600, datetime('now'));

-- edite o preço total do pedido
UPDATE purchases
SET total_price = 8000
WHERE id = 'p001';

SELECT 
purchases.id AS purchaseId,
users.id AS userId,
users.name,
users.email,
purchases.total_price,
purchases.created_at
FROM users
INNER JOIN purchases
ON users.id = purchases.buyer;

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

DROP TABLE purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES ('p001', 'prod005', 1),
('p002', 'prod006', 2),
('p003', 'prod007', 1);

SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id

INNER JOIN products
ON products.id = purchases_products.product_id;

