function addCount() {}

var mysql = require('mysql');
RDS_HOSTNAME = "database1.c8lplhzedax4.us-east-1.rds.amazonaws.com";
RDS_USERNAME = "admin";
RDS_PASSWORD = "admin123";
RDS_PORT = "3306";

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.end();
