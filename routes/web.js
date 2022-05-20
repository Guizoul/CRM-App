const schedule = require("node-schedule");
const { Database, dbCheckUsers } = require("../public/script/Dbservices.js");
const mydatabse = new Database();
const jwt = require("jsonwebtoken");

const authenticateToken = require("../public/middleware/authJWT.js").default;

const intAllRoutes = (app, dirname) => {
  //
  app.post("/login", async (req, res) => {
    console.log(req.body);
    let { email, password } = req.body;

    await dbCheckUsers("professeurs", email, password, res);
    await dbCheckUsers("admins", email, password, res);
    await dbCheckUsers("etudiants", email, password, res);
  });

  //
  app.get("/admin", (req, res) => {
    res.sendFile(dirname + "/public/admin.html");
  });
  //
  app.get("/login", (req, res) => {
    res.sendFile(dirname + "/public/login.html");
  });

  //home
  app.get("/", (req, res) => {
    res.sendFile(dirname + "/public/home.html");
  });

  app.post("/", async (req, res) => {
    //
    const niveau = req.body.niveau + 1;
    const jour = req.body.jour;
    const time = req.body.time;
    const sql = `select firstname,lastname,classe.nomfiliere,classe.niveau,matiere.nommatiere,emploi.idsalle
      from (emploi inner join classe  on classe.idclasse=emploi.idclasse) inner join matiere on matiere.idmatiere=emploi.idmatiere inner join professeurs on professeurs.id=emploi.idprof where classe.niveau=? and jour=? and debut=?;`;
    const result = await mydatabse.query(sql, [niveau, jour, time]);
    return res.json({ planning: result });
  });
  //plan inpt
  app.get("/planinpt", (req, res) => {
    res.sendFile(dirname + "/public/plan.html");
  });

  //
  app.get("/etudiant", (req, res) => {
    res.sendFile(dirname + "/public/etudiant.html");
  });

  //

  app.get("/prof", (req, res) => {
    res.sendFile(dirname + "/public/prof.html");
  });

  app.post("/emploi", async (req, res) => {
    const idprof = req.body.id;
    const requetSql = `select jour,debut,fin,matiere.nommatiere,classe.niveau,filiere.nom,idsalle from
    (emploi inner join classe on classe.idclasse=emploi.idclasse
     inner join matiere on matiere.idmatiere =emploi.idmatiere) inner join filiere on classe.nomfiliere =filiere.nom
     where idprof=${idprof};`;
    const result = await mydatabse.query(requetSql);
    return res.json({ planning: result });
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
