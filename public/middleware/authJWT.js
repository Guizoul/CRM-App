const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
require("dotenv").config();
function authenticateToken(req, res, next) {
  console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.send("hello 1");

  jwt.verify(token, process.env.API_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.send("hello 2");
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
