const express = require("express");
const mysql = require("mysql");

//

const app = express();

//import db services

const Database = require("./public/script/Dbservices");

const mydatabse = new Database();

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
async function dbCheckUsers(table, email, password, res) {
  let i = 0;
  i++;
  const sql = `SELECT email from ${table} where email="${email}"`;
  mydatabse.query(sql, []).then((result) => {
    if (result.length == 0 && i == 3) {
      return res.jso({ alter: "no such email" });
    }
    if (result.length != 0) {
      const sql1 = `SELECT password from ${table} where email="${email}"`;
      mydatabse.query(sql1, []).then((result) => {
        if (result[0].password == password) {
          if (table === "etudiant") {
            return res.json({ etudiant: "password correct" });
          } else if (table === "professeur") {
            module.exports = email;
            return res.json({ professeur: "password correct" });
          } else if (table === "admin") {
            return res.json({ admin: "password correct" });
          }
        } else {
          return res.json({ alert: " incorrect password" });
        }
      });
    }
  });
}

// LOGIN ROUT POST
app.post("/login", async (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;

  dbCheckUsers("professeur", email, password, res);
  await dbCheckUsers("admin", email, password, res);
  await dbCheckUsers("etudiant", email, password, res);
});

app.get("/etudiant", (req, res) => {
  res.sendFile(__dirname + "/public/etudiant.html");
});
app.get("/prof", (req, res) => {
  res.sendFile(__dirname + "/public/prof.html");
});
app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/public/admin.html");
});
