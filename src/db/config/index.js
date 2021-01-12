const fs = require('fs');
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOSTNAME,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT+9',
      dateStrings: true,
      typeCast: true
    },
    timezone: process.env.DEV_DB_TIMEZONE,
    seederStorage: 'sequelize',
    pool: {
      max: 30,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT+9',
      dateStrings: true,
      typeCast: true
    },
    timezone: process.env.DB_TIMEZONE,
    pool: {
      max: 30,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  },
};
