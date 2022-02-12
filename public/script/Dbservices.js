const mysql = require("mysql");

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
    console.log("query db");
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

module.exports = Database;
