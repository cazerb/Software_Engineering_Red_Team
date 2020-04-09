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

router.post('/delete', function(req, res) {
    var holdOBJ = req.body;
    
    //if any values are empty, set them to null
    for (var key in holdOBJ){
        if (holdOBJ[key] == '')
            holdOBJ[key] = null;
    }
    
    var roomNumber = holdOBJ.roomNumber;

    sql.query(`DELETE FROM rooms WHERE roomNumber = "${roomNumber}"`);
});

router.post('/update', function(req, res) {
    var holdOBJ = req.body;
    
    //if any values are empty, set them to null
    for (var key in holdOBJ){
        if (holdOBJ[key] == '')
            holdOBJ[key] = null;
    }
    
    var roomID = holdOBJ.roomID;
    var roomNumber = holdOBJ.roomNumber;
    var capacity = holdOBJ.capacity;
    console.log(roomID);

    sql.query(`UPDATE rooms SET roomNumber="${roomNumber}", capacity="${capacity}" WHERE roomID="${roomID}"`, function(err,result,field) {
        if(err) {
            console.log("FAILED")
            res.send("FAILED");
        }
        else {
            console.log("SUCCESS")
            res.send("SUCCESS");
        }
    });
})

router.get('/query', function(req, res) {
    sql.query("SELECT * FROM rooms", function(err,result,fields) {
        String(result);
        res.send(result);
    })
});

module.exports = router;
