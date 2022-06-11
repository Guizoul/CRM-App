const schedule = require("node-schedule");
const { Database, dbCheckUsers } = require("../public/script/Dbservices.js");
const mydatabse = new Database();
const jwt = require("jsonwebtoken");

const authenticateToken = require("../public/middleware/authJWT.js").default;

const intAllRoutes = (app, dirname) => {
  //contact and report route
  app.get("/contact", (req, res) => {
    res.sendFile(dirname + "/public/contactForm.html");
  });

  //
  app.post("/login", async (req, res) => {
    console.log(req.body);
    let { email, password } = req.body;

    await dbCheckUsers("professeurs", email, password, res);
    await dbCheckUsers("admins", email, password, res);
    await dbCheckUsers("etudiants", email, password, res);
  });

  app.post("/reservation", async (req, res) => {
    console.log(req.body);
    let {
      date,
      heure_debut,
      heure_fin,
      fois,
      salle,
      cours,
      filiere,
      niveau,
      bouton,
    } = req.body;
    const QList = `SELECT * FROM salles INNER JOIN reservation ON salles.idsalle=resrvation.idsalle where reservation.Dateres!=${date} and reservation.heuredebut!=${heure_debut} and salles.reservee=false;`;
    const result = await mydatabse.query(QList);
    return res.json({ SallesDispo: result });
  });

  //
  app.get("/admin", (req, res) => {
    res.sendFile(dirname + "/public/admin.html");
  });
  app.get("/admin/contact", (req, res) => {
    res.sendFile(dirname + "/public/Contact.html");
  });
  app.post("/admin/contact", (req, res) => {
    console.log("a report msg has arrived ");
    console.log(req.body);
    sql = `insert into reportpb values("name","classe","prb");`;
  });
  app.get("/admin/setPlanning", (req, res) => {
    res.sendFile(dirname + "/public/emploi_form.html");
  });
  // app.post("/admin/setPlanning", (req, res) => {
  //   console.log("setting emploi...");
  //   sql1 = `select from professeurs `;
  // });
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
      from (emploi inner join classe on classe.idclasse=emploi.idclasse) inner join matiere on matiere.idmatiere=emploi.idmatiere inner join professeurs on professeurs.id=emploi.idprof where classe.niveau=? and jour=? and debut=?;`;
    const result = await mydatabse.query(sql, [niveau, jour, time]);
    return res.json({ planning: result });
  });
  app.post("/admin/setPlanning", async (req, res) => {
    console.log("setting emploi...");
    console.log(req.body);
    let insertion;
    insertion = req.body.data.some((e) => e === null) ? false : true;

    let inserted = false;

    if (insertion) {
      console.log("inserting to emploi...");
      // queries
      const sql1 = `select id from professeurs where firstName='${req.body.data[0]}' and lastName='${req.body.data[1]}'`;
      const sql2 = `select idclasse from classe where nomfiliere='${req.body.data[2]}' and niveau='${req.body.data[3]}'`;
      const sql3 = `select idmatiere from matiere where nommatiere='${req.body.data[4]}'`;
      const sql4 = `select id from salles where id='${req.body.data[5]}'`;

      // executing queries
      const result1 = await mydatabse.query(sql1);
      const result2 = await mydatabse.query(sql2);
      const result3 = await mydatabse.query(sql3);
      const result4 = await mydatabse.query(sql4);

      if (
        result1[0] != undefined &&
        result2[0] != undefined &&
        result3[0] != undefined &&
        result4[0] != undefined
      ) {
        // extract results values if they're not null
        const idProf = result1[0].id;
        const idClasse = result2[0].idclasse;
        const idMatiere = result3[0].idmatiere;
        const idSalle = result4[0].id;

        const jour = req.body.data[6];
        const debut = req.body.data[7] + ":00";
        const fin = req.body.data[8] + ":00";
        console.log(jour, debut, fin);
        const sql5 = `insert into emploi values(${idProf}, ${idClasse}, ${idMatiere}, '${jour}','${debut}', '${fin}', '${idSalle}' )`;
        const executeQuery = await mydatabse.query(sql5);
        inserted = true;
      }
    } else {
      console.log("some field(s) is rong!!!");
    }
    if (inserted) {
      console.log("added to emploi successfully");
    } else {
      console.log("failed to insert");
    }
  });
  //plan inpt
  app.get("/planinpt", (req, res) => {
    res.sendFile(dirname + "/public/plan.html");
  });

  //
  app.get("/etudiant", (req, res) => {
    res.sendFile(dirname + "/public/etudiant.html");
  });
  app.post("/etudiant", async (req, res) => {
    const idetu = req.body.id;
    const rquetSql1 = `select classe.idclasse from classe inner join etudiants on etudiants.idclasse =classe.idclasse where etudiants.id =2;`;
    const requetSql2 = `select jour,debut,fin,professeurs.lastname, matiere.nommatiere ,idsalle from
    (emploi inner join matiere on matiere.idmatiere =emploi.idmatiere) inner join professeurs on professeurs.id =emploi.idprof  where emploi.idclasse= ?;`;
    const result = await mydatabse.query(rquetSql1); // idclasse of the student
    const result1 = await mydatabse.query(requetSql2, [result[0].idclasse]); //planning of the student
    console.log(result1);
    return res.json({ planning: result1 });
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

  //booking routes
  app.get("/booking", (req, res) => {
    res.sendFile(dirname + "/public/reservation.html");
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
};

module.exports = intAllRoutes;
