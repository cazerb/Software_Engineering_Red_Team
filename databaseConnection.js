var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "database1.c8lplhzedax4.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  port: "3306"
});

connection.connect(function(err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  console.log("Connected to database.");
});

module.exports = connection;
