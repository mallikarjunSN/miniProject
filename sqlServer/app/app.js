const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const demoController = require('../controllers/demoController.js');

const propController = require('../controllers/propController.js');

var app=express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, DELETE, OPTIONS"
	);
	next();
});

const conn=mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root1234',
    database : 'roomnodi'
});

conn.connect(function(error){
    if(error){
        console.log("Error in connecting to the database")
    }
    else{
        console.log("Connected successfully..");
    }
});


app.use('/prop',propController);

app.use('/demo',demoController);

app.get('/',(req,res,next)=>{
    res.status(200).json("The new method is also working");
});


module.exports=app.conn;

module.exports=app;