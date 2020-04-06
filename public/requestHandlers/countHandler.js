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

    var session = holdOBJ.session;
        startCount = holdOBJ.startCount;
        middleCount = holdOBJ.middleCount;
        endCount = holdOBJ.endCount;
        //passPhrase = holdOBJ.passPhrase;

    sql.query(`UPDATE sessions SET startCount="${startCount}",middleCount="${middleCount}",endCount="${endCount}" WHERE sessionID=
    (SELECT sessionID FROM sessions WHERE sessionName = "${session}")`);
});

module.exports = router;

