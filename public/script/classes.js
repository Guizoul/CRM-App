const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hazard",
  database: "inpt",
});

const sql = "SELECT * FROM classe";

db.query(sql, (err, result) => {
  if (err) {
    console.log(err.message);
  }
});
