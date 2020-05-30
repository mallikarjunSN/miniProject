const mysql = require('mysql');

// const conn = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : 'root1234',
//     database : 'WORLD'
// });

module.exports=mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root1234',
    database : 'roomnodi'
});