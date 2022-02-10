const express = require("express");
const mysql = require("mysql");
const app = express();

//connect with the db

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hazard",
  database: "inpt",
});

db.connect((err) => {
  if (err) {
    console.log("error in database");
    throw err;
  } else {
    console.log("connected ...");
  }
});

// see the path as static
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static("public"));
// listner
app.listen(1337, () => {
  console.log("listening on port 1337");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/firstpage.html");
});

//check if the form email and password exist eitther in prof /admin /etud tables


// LOGIN ROUT POST


app.get("/etudiant", (req, res) => {
  res.sendFile(__dirname + "/public/etudiant.html");
});
app.get("/prof", (req, res) => {
  res.sendFile(__dirname + "/public/prof.html");
});
app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/public/admin.html");
});
