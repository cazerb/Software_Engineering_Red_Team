const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./databaseConnection");

const RoomRoute = require("./tables/room");

const app = express();
app.use(bodyParser.json());
app.use("/room", RoomRoute);

app.get("/", function(req, res) {
  res.send("Load hompage here");
});

app.listen(3000, function() {
  console.log("Server started on port 3000...");
});
