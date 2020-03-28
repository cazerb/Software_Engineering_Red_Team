const mysql = require("mysql");

let mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "database name",
  multipleStatements: true
});

mysqlConnection.connect(error => {
  if (!error) {
    console.log("Connected");
  } else {
    console.log("Connection Failed");
  }
});

module.exports = mysqlConnection;
