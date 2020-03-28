const mysql = require("mysql");

let mysqlConnection = mysql.createConnection({
  host: "database1.c8lplhzedax4.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  port: "3306",
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
