const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
<<<<<<< HEAD
  password: "ROOT123456789",
=======
  password: "password",
>>>>>>> 1cabb1b763dbfacd77acd877add0550e1d772a8b
  database: "inpt",
});

// class DATABASE

class Database {
  connection = db;

  constructor() {
    //empty one
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, result) => {
        if (err) return reject(err);
        else resolve(result);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
const mydatabse = new Database();

////

async function dbCheckUsers(table, email, password, res, req) {
  //generate token
  let token = jwt.sign(email, process.env.API_SECRET);
  //
  const sql = `SELECT email,firstname,lastname,id from ${table} where email="${email}"`;
  const result1 = await mydatabse.query(sql, []);
  if (result1.length != 0) {
    const sql1 = `SELECT password from ${table} where email="${email}"`;
    const result2 = await mydatabse.query(sql1, []);
    if (result2[0].password == password) {
      // create a token for the user
      console.log(token);

      if (table === "etudiants") {
        return res.json({
          id: result1[0].id,
          name: result1[0].firstname + " " + result1[0].lastname,
          acesstoken: token,
          etudiant: "password correct",
        });
      } else if (table === "professeurs") {
        return res.json({
          id: result1[0].id,
          name: result1[0].firstname + " " + result1[0].lastname,
          acesstoken: token,
          professeur: "password correct",
        });
      } else if (table === "admins") {
        return res.json({
          id: result1[0].id,
          name: result1[0].firstname + " " + result1[0].lastname,
          acesstoken: token,
          admin: "password correct",
        });
      }
    } else {
      return res.json({
        acesstoken: token,
        alert: " incorrect password",
      });
    }
  }
}

/// classe db

module.exports = { Database, dbCheckUsers };
