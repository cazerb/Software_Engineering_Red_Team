const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./databaseConnection");

const app = express();
app.use(bodyParser.json());
const path = require('path');

app.use(express.static(path.join(__dirname,'count-ui')));
app.use('/html',(req,res,next)=>{
res.sendFile(path.join(__dirname,'count-ui','index.html'));
res.sendFile(path.join(__dirname,'count-ui','style.css'));
});

app.listen(3000);