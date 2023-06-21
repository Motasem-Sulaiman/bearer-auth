"use strict";
const {Users}=require('./index')
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_DATA;

console.log(Users)
const authBasic = async function (username, password) {

  const user = await Users.findOne({ where: { username: username } });
console.log(user)
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

const authBearer=async function(token){
const parsedToken=jwt.verify(token,SECRET)
const user= await Users.findOne({where:{username:parsedToken.username}})
if(user.username){

    return user
}else{

    throw new Error('invalid token')
}


}

module.exports = {authBasic,authBearer};

