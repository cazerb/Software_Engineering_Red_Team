var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var sql = require("../../databaseConnection");

router.post('/insert', function(req, res) {
    var holdOBJ = req.body;
    
    //if any values are empty, set them to null
    for (var key in holdOBJ){
        if (holdOBJ[key] == '')
            holdOBJ[key] = null;
    }
    
    var roomNumber = holdOBJ.roomNumber;
        capacity = holdOBJ.capacity;
        
    sql.query(`INSERT INTO rooms(roomNumber,capacity) VALUES(${roomNumber},${capacity})`);
});

module.exports = router;

