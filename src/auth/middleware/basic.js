'use strict';
const {Users}=require('../models/index')
const base64 = require('base-64');
const {authBasic}=require('../models/users-model')
// const Users = require('../models/users-model');

function basic(req, res, next) {
    if (req.headers.authorization) {

        let headersParts = req.headers.authorization.split(" ");

        let encodedValue = headersParts.pop();
        let decodedValue = base64.decode(encodedValue);
        let [username, password] = decodedValue.split(":");
        authBasic(username, password)
            .then((data) => {
                console.log(data);
                req.user = data;
                next();
            }).catch((error) => {
                next(error.message);
            })
    }
}


module.exports = basic;