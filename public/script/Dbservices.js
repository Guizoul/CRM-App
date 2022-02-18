const mysql = require("mysql");
const jwt = require("jsonwebtoken");

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
  let i = 0;
  i++;
  const sql = `SELECT email from ${table} where email="${email}"`;
  mydatabse.query(sql, []).then((result) => {
    if (result.length == 0 && i == 3) {
      return res.jso({
        alter: "no such email",
      });
    }
    if (result.length != 0) {
      const sql1 = `SELECT password from ${table} where email="${email}"`;
      mydatabse.query(sql1, []).then((result) => {
        if (result[0].password == password) {
          // create a token for the user

          let token = jwt.sign(email, process.env.API_SECRET);

          console.log(token);

          if (table === "etudiant") {
            return res.json({
              acesstoken: token,
              etudiant: "password correct",
            });
          } else if (table === "professeur") {
            module.exports = email;
            return res.json({
              cesstoken: token,
              professeur: "password correct",
            });
          } else if (table === "admin") {
            return res.json({
              cesstoken: token,
              admin: "password correct",
            });
          }
        } else {
          return res.json({
            acesstoken: null,
            alert: " incorrect password",
          });
        }
      });
    }
  });
}

/// classe db

module.exports = { Database, dbCheckUsers };
