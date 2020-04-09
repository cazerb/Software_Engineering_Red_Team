var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var sql = require("../../databaseConnection");

router.post('/insertCounts', function(req, res) {
    var holdOBJ = req.body;
    
    //if any values are empty, set them to null
    for (var key in holdOBJ){
        if (holdOBJ[key] == '')
            holdOBJ[key] = null;
    }

    var sessionID = holdOBJ.sessionID;
    var count = holdOBJ.count;
    var countTime = holdOBJ.countTime;
    var passPhrase = holdOBJ.passPhrase;

    if (countTime === "1" && passPhrase === "123") {
        sql.query(`UPDATE sessions SET startCount="${count}" WHERE sessionID="${sessionID}"`, function(err,result,field) {
            if(err) {
                res.send("FAILED");
            }
            else {
                res.send("SUCCESS");
            }
        });
    }
    else if (countTime === "2" && passPhrase === "123") {
        sql.query(`UPDATE sessions SET middleCount="${count}" WHERE sessionID="${sessionID}"`, function(err,result,field) {
            if(err) {
                res.send("FAILED");
            }
            else {
                res.send("SUCCESS");
            }
        });
    }
    else if (countTime === "3" && passPhrase === "123") {
        sql.query(`UPDATE sessions SET endCount="${count}" WHERE sessionID="${sessionID}"`, function(err,result,field) {
            if(err) {
                res.send("FAILED");
            }
            else {
                res.send("SUCCESS");
            }
        });
    }
    else {
        res.send("ERROR");
    }
});

module.exports = router;

