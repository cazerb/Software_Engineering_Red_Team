const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./databaseConnection");
const handler = require("./public/global/requestHandler");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use('/public', express.static('public'));

app.use('/roomHandler', handler);

//get all admin UI
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/public/admin/index.html"));
});
app.get("/room", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/public/admin/room.html"));
});
app.get("/session", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/public/admin/session.html"));
});     
app.get("/presenter", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/public/admin/presenter.html"));
});



app.listen(3000);
