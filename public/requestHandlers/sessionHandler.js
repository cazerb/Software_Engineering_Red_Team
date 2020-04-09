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
    var startTime = holdOBJ.startTime;
    var endTime = holdOBJ.endTime;
    var roomID = holdOBJ.roomID;
    var presenterID = holdOBJ.presenterID;
    
    sql.query(`INSERT INTO sessions(sessionName,startTime,endTime,roomID,presenterID) VALUES("${sessionName}",${startTime},
    ${endTime},${roomID},${presenterID})`, function (error, results, fields) {
        if (error !== null) {
            if(error.code == "ER_DUP_ENTRY"){
                console.log("THE SESSION NAME ALREADY EXISTS");
            }
        }
    });
});

router.post('/delete', function(req, res) {
    var holdOBJ = req.body;
    
    //if any values are empty, set them to null
    for (var key in holdOBJ){
        if (holdOBJ[key] == '')
            holdOBJ[key] = null;
    }
    
    var sessionID = holdOBJ.sessionID;
    sql.query(`DELETE FROM sessions WHERE sessionID = "${sessionID}"`);
})

router.post('/update', function(req, res) {
    var holdOBJ = req.body;
    
    //if any values are empty, set them to null
    for (var key in holdOBJ){
        if (holdOBJ[key] == '')
            holdOBJ[key] = null;
    }
    
    var sessionID = holdOBJ.sessionID;
    var sessionName = holdOBJ.sessionName;
    var startTime = holdOBJ.startTime;
    var endTime = holdOBJ.endTime;
    var presenterID = holdOBJ.presenterID;
    var roomID = holdOBJ.roomID;

    sql.query(`UPDATE sessions SET sessionName="${sessionName}", startTime="${startTime}", endTime="${endTime}", presenterID="${presenterID}", roomID="${roomID}" WHERE sessionID="${sessionID}"`, function(err,result,field) {
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
    sql.query("SELECT * FROM sessions", function(err,result,fields) {
        String(result);
        res.send(result);
    })
});



module.exports = router;

