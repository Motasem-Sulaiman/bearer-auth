"use strict";
const express = require("express");
const app = express();

const notFound = require("./middleware/404");
const errorHandler = require("./middleware/500");
const authRouter=require('./auth/router')
app.use(express.json());
app.use(authRouter)
app.get("/", welcomeHandler);
function welcomeHandler(req, res) {
  res.status(200).send("hi from home");
}
function start(port) {
  app.listen(port, () => {
    console.log(`server is up and listen on ${port}`);
  });
}

app.use("*", notFound);
// app.use(errorHandler);

module.exports = {
  start: start,
  app: app,
};
