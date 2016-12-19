var mysql = require('mysql');
//var express = require('express');
//var router = express.Router();


var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'light'
});



console.log(mysql); 
addProduct();

//module.exports = router;


function addProduct() {

  connection.connect();

  var productAddSql = "insert into product(title, price, createdate, updatedate) values(?, ?, sysdate(), sysdate())";

  var productAddSql_Params = ['test product 22', 10];

  connection.query(productAddSql, productAddSql_Params, function(err, result) {
    if(err) {
      console.log('[insert error] - ', err.message);
      return;
    }

    console.log('--------------- insert -----------------');
    console.log('insert id', result);
    console.log('----------------------------------------');
  });

  connection.end();
}

