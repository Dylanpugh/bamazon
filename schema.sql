CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY(item_id)
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Avengers", "ENTERTAINMENT", 19.99, 25), ("Mario Kart", "GAMING", 49.99, 40), ("Star Wars", "ENTERTAINMENT", 29.99, 35), ("Call of Duty", "GAMING", 49.99, 45), ("Sweatshirt", "CLOTHING", 29.99, 30), ("Boardshorts", "CLOTHING", 39.99, 60), ("Apples", "FOOD", 4.99, 100), ("Peanut Butter Cookies", "FOOD", 9.99, 50), ("Zelda", "GAMING", 39.99, 45), ("Game of Thrones", "ENTERTAINMENT", 19.99, 30), ("Cards", "GAMING", 6.99, 25);