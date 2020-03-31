var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var sql = require("../../databaseConnection");

router.post('', function(req, res) {
  var roomNumber = req.body.roomNumber;
  capacity = req.body.capacity;

  sql.query('INSERT INTO rooms(roomNumber,capacity) VALUES(' + roomNumber + ',' + capacity + ')');
  res.send("Success");
});

module.exports = router;

