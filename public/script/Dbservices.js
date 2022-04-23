const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const { system } = require("nodemon/lib/config");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hazard",
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

  classeDb() {
    const sqlC = "SELECT * FROM classe";
    db.query(sqlC, (err, result) => {
      if (err) throw err;
      else {
        return result;
      }
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
  const sql = `SELECT email from ${table} where email="${email}"`;
  const result1 = await mydatabse.query(sql, []);

  if (result1.length != 0) {
    const sql1 = `SELECT password from ${table} where email="${email}"`;
    const result2 = await mydatabse.query(sql1, []);
    if (result2[0].password == password) {
      // create a token for the user
      console.log(token);

      if (table === "etudiant") {
        return res.json({
          email: email,
          acesstoken: token,
          etudiant: "password correct",
        });
      } else if (table === "professeur") {
        return res.json({
          email: email,
          acesstoken: token,
          professeur: "password correct",
        });
      } else if (table === "admin") {
        return res.json({
          email: email,
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
