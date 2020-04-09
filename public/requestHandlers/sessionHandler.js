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
    
    var sessionName = holdOBJ.sessionName;
    sql.query(`DELETE FROM sessions WHERE sessionName = "${sessionName}"`);
})

router.get('/query', function(req, res) {
    sql.query("SELECT * FROM sessions", function(err,result,fields) {
        String(result);
        res.send(result);
    })
});



module.exports = router;

