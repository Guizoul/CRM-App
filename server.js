//import modules here

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");
require("dotenv").config();

const authenticateToken = require("./public/middleware/authJWT");

// express function returns an object , to call on htpp methos

const app = express();
app.use(express.json());
app.use(bodyParser.json());
// see the path as static
app.use(express.static(__dirname));
app.use(express.static("public"));

//import db services

const { Database, dbCheckUsers } = require("./public/script/Dbservices");
const mydatabse = new Database();

// listner
app.listen(1337, () => {
  console.log("listening on port 1337");
});

//check if the form email and password exist eitther in prof /admin /etud tables

// LOGIN ROUT POST
app.post("/login", async (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;

  await dbCheckUsers("professeur", email, password, res);
  await dbCheckUsers("admin", email, password, res);
  await dbCheckUsers("etudiant", email, password, res);
});

// site web routes
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/firstpage.html");
});

app.get("/etudiant", (req, res) => {
  res.sendFile(__dirname + "/public/etudiant.html");
});

//
app.get("/prof", (req, res) => {
  res.sendFile(__dirname + "/public/prof.html");
});
app.post("/prof", async (req, res) => {
  const result = await mydatabse.query(
    "SELECT * FROM classe WHERE reservee=false",
    []
  );
  let sallesid = [];
  let sallescapacity = [];
  for (let i = 0; i < result.length; i++) {
    sallesid.push(result[i].idclasse);
    sallescapacity.push(result[i].capacity);
  }
  res.json({ classeid: sallesid, classecapacity: sallescapacity });
});
//
app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/public/admin.html");
});

/// reserve the classe in db
app.put("/prof", (req, res) => {
  const { idclasse, dateRes } = req.body;
  console.log(idclasse, dateRes);
  const dateBeginingOfReservation = new Date(dateRes);

  // date end reservation after 3hours of the reservation date ;
  let dateEndReservaetion = new Date(dateRes);
  dateEndReservaetion.setHours(dateEndReservaetion.getHours() + 4);
  // dateEndReservaetion.setDate()
  console.log(dateEndReservaetion);

  schedule.scheduleJob(dateBeginingOfReservation, async () => {
    console.log("ready to exucute in db ");
    await mydatabse.query(
      `UPDATE classe set reservee=true where idclasse="${idclasse}"`
    );
  });

  //end of reservation
  schedule.scheduleJob(dateEndReservaetion, async () => {
    console.log("ready to exucute in db ");
    await mydatabse.query(
      `UPDATE classe set reservee=true where idclasse="${idclasse}"`
    );
  });
});

// mydatabse
//   .query(`select daResevation from reservation where idSalle="B12"`)
//   .then((result) => {
//     let newdate = new Date(`"${result[0].daResevation}"`);
//     console.log(newdate);
//   })
//   .catch((err) => console.log(err));
