var config = {};

config.app = {
  title: 'SWEN303 Project'
};

config.mysql = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'vagrant',
  password: process.env.DB_PASS || 'vagrant',
  database: process.env.DB_NAME || 'vagrant',
  port: process.env.DB_PORT || 13306
};

module.exports = config;
