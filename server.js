//import modules here
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const socketio = require("socket.io");

const initAllRoutes = require("./routes/web.js");
require("dotenv").config();

const app = express();

const server = http.createServer(app);
app.use(express.json());
app.use(bodyParser.json());

//
const io = socketio(server);
// see the path as static
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname));
app.use(express.static("./public"));

//  msg handling

io.on("connection", async (socket) => {
  console.log("New web socket connection");
  socket.emit("message", "this is a message from server");

  await socket.on("reportMsg", (msg) => {
    socket.emit("message", msg);
  });
});
// listner
server.listen(1337);
// init all routes
initAllRoutes(app, __dirname);

///// 404 route
app.use((req, res) => {
  res.sendFile(__dirname + "/public/404.html");
});
