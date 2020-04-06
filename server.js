const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./databaseConnection");
const path = require("path");

const presenterHandler = require("./public/requestHandlers/presenterHandler");
const roomHandler = require("./public/requestHandlers/roomHandler");
const sessionHandler = require("./public/requestHandlers/sessionHandler");
const countHandler = require("./public/requestHandlers/countHandler");

const app = express();

app.use(bodyParser.json());
app.use('/public', express.static('public'));

app.use('/presenterHandler', presenterHandler);
app.use('/roomHandler', roomHandler);
app.use('/sessionHandler', sessionHandler);
app.use('/countHandler', countHandler);

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

//get count UI
app.get("/count", (req, res, next) => {
    res.sendFile(path.join(__dirname + "/public/count-ui/index.html"));
  });

app.listen(3000);
