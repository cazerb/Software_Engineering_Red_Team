const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../databaseConnection");

Router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * from room", (error, rows, fields) => {
    if (!error) {
      res.send(rows);
    } else {
      console.log(error);
    }
  });
});

module.exports = Router;
