const schedule = require("node-schedule");
const { Database, dbCheckUsers } = require("../public/script/Dbservices.js");
const mydatabse = new Database();
const jwt = require("jsonwebtoken");

const authenticateToken = require("../public/middleware/authJWT.js");

const intAllRoutes = (app, dirname) => {
  //
  app.post("/login", async (req, res) => {
    console.log(req.body);
    let { email, password } = req.body;

    await dbCheckUsers("professeur", email, password, res);
    await dbCheckUsers("admin", email, password, res);
    await dbCheckUsers("etudiant", email, password, res);
  });

  //
  app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/public/admin.html");
  });
  //
  app.get("/login", (req, res) => {
    res.sendFile(dirname + "/public/login.html");
  });
  app.get("/", (req, res) => {
    res.sendFile(dirname + "/public/login.html");
  });

  app.get("/etudiant", (req, res) => {
    res.sendFile(dirname + "/public/etudiant.html");
  });

  //

  app.get("/prof", (req, res) => {
    res.sendFile(dirname + "/public/prof.html");
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

  ///
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
};

module.exports = intAllRoutes;
