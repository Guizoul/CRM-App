//import modules here
const express = require("express");
const bodyParser = require("body-parser");

const initAllRoutes = require("./routes/web.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
// see the path as static
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname));
app.use(express.static("./public"));

// listner
app.listen(1337, () => {
  console.log("listening on port 1337");
});

//

// init all routes
initAllRoutes(app, __dirname);

///// 404 route
app.use((req, res) => {
  res.sendFile(__dirname + "/public/404.html");
});
