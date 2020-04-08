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

    sql.query(`INSERT INTO presenter(name,email,phone) VALUES("${name}","${email}","${phone}")`);
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
    var phone = holdOBJ.phone;

    sql.query(`DELETE FROM presenter WHERE name = "${name}" AND email = "${email}" AND phone = "${phone}"`)
})

router.get('/query', function(req, res) {
    sql.query("SELECT * FROM presenter", function(err,result,fields) {
        String(result);
        res.send(result);
    })
});

module.exports = router;
