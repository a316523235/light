var express = require('express');
var mysql = require('mysql');
var base = require('../bll/base.js');
var menu = require('../bll/menu.js');
var menuObj = new menu();
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var jsn = { title: 'Express', name: 'Ice', menus: menuObj.menus };
  var sqldate = "select * from product order by updatedate limit 0, 18";
  
  var date = [];
  var connection = mysql.createConnection(base.mysqlConfig);
  connection.connect();
  connection.query(sqldate, function(err, result, feilds) {
    if(err) {
        res.json({ code: 500, msg: "操作失败", err: err });
    }
    if(result) {
	  connection.end();
	  jsn.lstProduct = result;
      //res.json(jsn); 
      res.render('index2', jsn);
    }
  });
  //res.render('index2', jsn);
});

module.exports = router;
