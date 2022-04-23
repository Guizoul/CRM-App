//import modules here

const express = require("express");
const bodyParser = require("body-parser");

const initAllRoutes = require("./routes/web.js");
const connectToDb = require("./config/connectDb.js");

connectToDb();

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
// see the path as static
app.use(express.static(__dirname));
app.use(express.static("public"));

// listner
app.listen(1337, () => {
  console.log("listening on port 1337");
});

// init all routes
initAllRoutes(app, __dirname);
