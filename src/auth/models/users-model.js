"use strict";
const {Users}=require('./index')
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_DATA;
// const { Sequelize, DataTypes } = require("sequelize");

const users = (sequelize, DataTypes) =>
  sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
    },
  });

// const Users = users(Sequelize, DataTypes);
console.log(users)
const authBasic = async function (username, password) {
  // 
  const user = await Users.findOne({ where: { username: username } });

  const validUser = await bcrypt.compare(password, user.password);
  if (validUser) {
    let newToken = jwt.sign(
      { username: user.username, password: user.password },
      SECRET
    );
    user.token = newToken;
    return user;
  } else {
    throw new Error("invalid user");
  }
};

module.exports = {users,authBasic};

