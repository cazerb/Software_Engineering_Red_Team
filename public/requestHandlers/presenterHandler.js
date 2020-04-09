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

    var name = holdOBJ.name;
        email = holdOBJ.email;
        phone = holdOBJ.phone;

    sql.query(`INSERT INTO presenter(name,email,phone) VALUES("${name}","${email}","${phone}")`, function(error, result, field) {
        if (error) {
            if(error.code === "ER_DUP_ENTRY"){
                console.log("THE EMAIL ALREADY EXISTS");
            }
            console.log(error);
        }
        else {
            console.log("FINISHED");
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
    
    var name = holdOBJ.name;
    var email = holdOBJ.email;

    sql.query(`DELETE FROM presenter WHERE name = "${name}" AND email = "${email}"`)
})

router.post('/update', function(req, res) {
    var holdOBJ = req.body;
    
    //if any values are empty, set them to null
    for (var key in holdOBJ){
        if (holdOBJ[key] == '')
            holdOBJ[key] = null;
    }
    
    var presenterID = holdOBJ.presenterID;
    var name = holdOBJ.name;
    var email = holdOBJ.email;
    var phone = holdOBJ.phone;

    console.log(presenterID);

    sql.query(`UPDATE presenter SET name="${name}", email="${email}", phone="${phone}" WHERE presenterID="${presenterID}"`, function(err,result,field) {
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
    sql.query("SELECT * FROM presenter", function(err,result,fields) {
        String(result);
        res.send(result);
    })
});

module.exports = router;
