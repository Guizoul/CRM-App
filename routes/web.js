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
  //prof booking
  app.post("/reservation", async (req, res) => {
    let { date, heure_debut, typeSalle } = req.body;
    console.log(typeSalle);
    const QList = `select id from salles where reservee=false and type="${typeSalle}" and id not in (SELECT idsalle FROM reservation where Dateres="${date}" and heuredebut="${heure_debut}:00");
    `;
    const result = await mydatabse.query(QList);
    console.log(result);
    return res.json({ SallesDispo: result });
  });

  //admin booking
  app.get("/admin/reservation", (req, res) => {
    res.sendFile(dirname + "/public/reservation_admin.html");
  });

  app.post("/admin/booking", async (req, res) => {
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
    const QList = `SELECT salles.id FROM salles where reservee=false not in (select reservation.idsalle as id from reservation where Dateres="2022-06-10" and heuredebut="10:00:00") ;
    `;
    const result = await mydatabse.query(QList);
    console.log(result);
    return res.json({ SallesDispo: result });
  });

  //
  app.get("/admin", (req, res) => {
    res.sendFile(dirname + "/public/admin.html");
  });
  app.get("/admin/contact", (req, res) => {
    res.sendFile(dirname + "/public/Contact.html");
  });
  app.post("/admin/contact", async (req, res) => {
    console.log("a report msg has arrived ");
    console.log(req.body);
    let currentDate = new Date();
    let time =
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();
    sql = `insert into reportpb values("${req.body.name}","${req.body.Classe}","${req.body.ReportMsg}" ,"${time}");`;
    const result = await mydatabse.query(sql);
    return res.json({ success: "inserted successfully" });
  });
  app.post("/admin/contact/getReports", async (req, res) => {
    sql = `SELECT * FROM reportpb`;
    const result = await mydatabse.query(sql);
    console.log(result);
    return res.json({
      reports: result,
    });
  });
  app.get("/admin/setPlanning", (req, res) => {
    res.sendFile(dirname + "/public/planning.html");
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
      console.log(result1);
      if (
        result1.length != 0 &&
        result2.length != 0 &&
        result3.length != 0 &&
        result4.length != 0
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
    }
    if (inserted) {
      return res.json({
        success: "ajouté à emploi avec succès",
      });
    } else {
      return res.json({
        fail: "échec de l'insertion dans emploi vérifier les valeurs saisies",
      });
    }
  });

  app.post("/admin/setPlanning/getProfPlanning", async (req, res) => {
    const [firstName, lastName] = req.body.data.split(" ");
    const sql1 = `select id from professeurs where firstName='${firstName}' and lastName='${lastName}'`;
    const result1 = await mydatabse.query(sql1);
    if (result1.length != 0) {
      const requetSql = `select jour,debut,fin,matiere.nommatiere,classe.niveau,filiere.nom,idsalle from
      (emploi inner join classe on classe.idclasse=emploi.idclasse
       inner join matiere on matiere.idmatiere =emploi.idmatiere) inner join filiere on classe.nomfiliere =filiere.nom
       where idprof=${result1[0].id};`;

      const result = await mydatabse.query(requetSql);
      console.log(result);
      if (result.length != 0) {
        return res.json({
          searchResult: result,
        });
      } else {
        return res.json({
          noResult: "pas de resultat",
        });
      }
    } else {
      return res.json({
        error: "aucun prof avec ce nom essayez le format (prenom nom)",
      });
    }
  });

  app.get("/login", (req, res) => {
    res.sendFile(dirname + "/public/login.html");
  });

  //bookingList
  app.get("/prof/Mesreservations", (req, res) => {
    res.sendFile(dirname + "/public/reservation_list.html");
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

  // app.post("/prof", async (req, res) => {
  //   const result = await mydatabse.query(
  //     "SELECT * FROM classe WHERE reservee=false",
  //     []
  //   );
  //   let sallesid = [];
  //   let sallescapacity = [];
  //   for (let i = 0; i < result.length; i++) {
  //     sallesid.push(result[i].idclasse);
  //     sallescapacity.push(result[i].capacity);
  //   }
  //   res.json({ classeid: sallesid, classecapacity: sallescapacity });
  // });

  ///

  //booking routes
  app.get("/prof/reservation", (req, res) => {
    res.sendFile(dirname + "/public/reservation.html");
  });
  app.post("/prof/reservationList", async (req, res) => {
    const id = req.body.id;
    const sql = `SELECT * FROM reservation WHERE idProf=${id}`;
    const result = await mydatabse.query(sql);
    console.log(result);
    return res.json({ booked: result });
  });

  //

  app.get("/listreservation", (req, res) => {
    res.sendFile(dirname + "/public/sallesreservees.html");
  });
  app.post("/reservationList", async (req, res) => {
    const sql = `select idsalle , Dateres , heuredebut , heurefin ,lastname,firstname,matiere  from reservation inner join professeurs on 
    professeurs.id =reservation.idprof ;`;
    const result = await mydatabse.query(sql);
    console.log(result);
    return res.json({ booked: result });
  });

  app.delete("/prof/annulerReservation", async (req, res) => {
    const { id, salle, dateRes, heurdebut } = req.body;
    const sql = `DELETE FROM reservation Where idsalle="${salle}" and Dateres="${dateRes}" and idprof=${id} and heuredebut="${heurdebut}" ;`;
    console.log(sql);
    await mydatabse.query(sql);

    return res.json({ success: "deleted" });
  });
  // app.get("/admin/booking", (req, res) => {
  //   res.sendFile(dirname + "/public/reservation_admin.html");
  // });

  /// reserve the classe in db
  app.put("/reservation", async (req, res) => {
    const {
      date,
      heure_debut,
      heure_fin,
      salle,
      filiere,
      niveau,
      idprof,
      matiere,
    } = req.body;

    let ine = niveau.substr(niveau.length - 1);

    const sqlReservationTable = `insert into reservation values("${salle}","${date}","${heure_debut}:00","${heure_fin}:00","${filiere}",${ine},${idprof},"${matiere}");`;
    let datereserver = new Date(date + " " + heure_debut);
    datereserver.setHours(datereserver.getHours() + 1);
    let datetimefinreserve = new Date(date + " " + heure_fin);
    datetimefinreserve.setHours(datetimefinreserve.getHours() + 1);
    console.log(req.body);
    await mydatabse.query(sqlReservationTable);

    schedule.scheduleJob(datereserver, async () => {
      console.log("ready to exucute in db ");
      await mydatabse.query(
        `UPDATE salles set reservee=true where id="${salle}"`
      );
    });

    //end of reservation
    schedule.scheduleJob(datetimefinreserve, async () => {
      console.log("ready to exucute in db ");
      await mydatabse.query(
        `UPDATE salles set reservee=true where id="${salle}"`
      );
    });
    return res.json({ booked: "la salle à était bien réservée" });
  });

  //
  app.put("/admin/reservation", async (req, res) => {
    const { date, heure_debut, heure_fin, salle, idadmin, objectif } = req.body;

    const sqlReservationTable = `insert into reservationadm values("${salle}",${idadmin},"${date}","${heure_debut}","${heure_fin}","${objectif}");`;
    let datereserver = new Date(date + " " + heure_debut);
    datereserver.setHours(datereserver.getHours() + 1);
    let datetimefinreserve = new Date(date + " " + heure_fin);
    datetimefinreserve.setHours(datetimefinreserve.getHours() + 1);
    console.log(req.body);
    await mydatabse.query(sqlReservationTable);

    schedule.scheduleJob(datereserver, async () => {
      console.log("ready to exucute in db ");
      await mydatabse.query(
        `UPDATE salles set reservee=true where id="${salle}"`
      );
    });

    //end of reservation
    schedule.scheduleJob(datetimefinreserve, async () => {
      console.log("ready to exucute in db ");
      await mydatabse.query(
        `UPDATE salles set reservee=true where id="${salle}"`
      );
    });
    return res.json({ booked: "la salle à était bien réservée" });
  });
  //
};

module.exports = intAllRoutes;
