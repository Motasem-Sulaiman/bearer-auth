"use strict";
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const users=require('./user.model')
const POSTGRESS_URI =
  process.env.NODE_ENV === "test"
    ? "sqlite::memory:"
    : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRESS_URI, sequelizeOptions);
module.exports = {
  db: sequelize,
  Users: users(sequelize, DataTypes),
};