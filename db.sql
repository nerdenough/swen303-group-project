# Users
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  email VARCHAR(32) NOT NULL,
  password VARCHAR(100) NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  publisher TINYINT(1) NOT NULL,
  registered INT(13) NOT NULL,
  PRIMARY KEY (id)
);

# Publishers
CREATE TABLE publishers (
  id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) NOT NULL,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  website VARCHAR(100),
  PRIMARY KEY (id)
);

# Software
CREATE TABLE software (
  id INT(11) NOT NULL AUTO_INCREMENT,
  publisher_id INT(11) NOT NULL,
  price DECIMAL NOT NULL,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  website VARCHAR(100),
  category VARCHAR(20),
  PRIMARY KEY (id)
);

# Orders
CREATE TABLE orders (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  order_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  address_id int(11) NOT NULL,
  PRIMARY KEY (id)
);

# Order Softwares
CREATE TABLE order_software (
  id int(11) NOT NULL AUTO_INCREMENT,
  order_id int(11) NOT NULL,
  software_id int(11) NOT NULL,
  license_key varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

# Addresses
CREATE TABLE addresses (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  def tinyint(1) NOT NULL,
  attn varchar(255) NOT NULL,
  addr1 varchar(255) NOT NULL,
  addr2 varchar(255) NOT NULL,
  city varchar(255) NOT NULL,
  zip varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

# Carts
CREATE TABLE carts (
  id int(11) NOT NULL AUTO_INCREMENT,
  software_id int(11) NOT NULL,
  user_id int(11) NOT NULL,
  PRIMARY KEY (id)
)