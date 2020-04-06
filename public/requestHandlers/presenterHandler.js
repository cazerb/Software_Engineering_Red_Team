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

module.exports = router;

