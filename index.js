'use strict'
require('dotenv').config();
let port=process.env.PORT||3001;
const server=require("./src/server")
const {db}=require('./src/auth/models/index')

db.sync()
.then(()=>{

    server.start(port)


})