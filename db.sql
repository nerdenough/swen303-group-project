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
  PRIMARY KEY (id)
);

# Orders
CREATE TABLE orders (
  id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) NOT NULL,
  software_id INT(11) NOT NULL,
  order_date INT(13) NOT NULL,
  license_key VARCHAR(16) NOT NULL,
  PRIMARY KEY (id)
);
