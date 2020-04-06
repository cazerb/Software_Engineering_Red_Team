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

    var sessionName = holdOBJ.sessionName;
        startTime = holdOBJ.startTime;
        endTime = holdOBJ.endTime;
        room = holdOBJ.room;
        presenter = holdOBJ.presenter;
    
    sql.query(`INSERT INTO sessions(sessionName,startTime,endTime,roomID,presenterID) VALUES("${sessionName}","${startTime}",
    "${endTime}",(SELECT roomID FROM rooms WHERE roomNumber = ${room}),(SELECT presenterID FROM presenter WHERE name = "${presenter}"))`, function (error, results, fields) {
        if(error.code == "ER_DUP_ENTRY"){
            console.log("THE SESSION NAME ALREADY EXISTS");
        }
    });

});

module.exports = router;

