var mysql = require('mysql');
var express = require('express');
var base = require('../bll/base.js');
var router = express.Router();

router.get('/list/:type/:type2', function(req, res, next) {
  var type = req.params.type || '';
  var type2 = req.params.type2 || '';
  var page = req.query.page || '1';
  var pagesize = req.query.pagesize || '12';
  var where = ' where 1=1 ';
  switch(type) {
    case '':
      break;
    case 'all': case 'News': case 'Products': case 'Showing':
      break;
    default :
      if(type2 == 'all') {
        where += " and {0} is not null ".replace('{0}', type);
      } else {
        where += " and {0}='{1}' ".replace('{0}', type).replace('{1}', type2);
      }
      break;      
  }  

  var limit = ' limit {0},{1}'.replace('{0}', page*pagesize-pagesize).replace('{1}', page*pagesize);
  var sqlcount = "select count(id) as total from product " + where;
  var sqldate = "select * from product " + where + limit;
  
  var date = [];
  var total = 0;
  var connection = mysql.createConnection(base.mysqlConfig);
  connection.connect();
  connection.query(sqldate, function(err, result, feilds) {
    if(err) {
        res.json({ code: 500, msg: "操作失败", err: err });
    }
    if(result) {
      date = result;
      connection.query(sqlcount, function(err2, result2, feilds2) {
        if(err2) {
            res.json({ code: 500, msg: "操作失败", err: err2 });
          throw err2;
        }
        if(result2) {
          connection.end();
          var jsn = { code: 200, msg: '操作成功', type: type, type2: type2, total: result2[0].total, lstProduct: date, query: sqldate, page: page, pagesize: pagesize };
          res.json(jsn);
        }
      });   
    }
  });
});

router.post('/add', function (req, res, next) {
  var product = req.body;
  var sql = 'insert into product(title, price, createdate, updatedate, lights, party, color, image, content1, content2, bigimage) values(?, ?, sysdate(), sysdate(), ?, ?, ?, ?, ?, ?, ?)';
  var params = [product.title, product.price, product.lights, product.party, product.color, product.image, product.content1, product.content2, product.bigimage];
  var connection = mysql.createConnection(base.mysqlConfig);
  //res.json(product);
  connection.connect();
  connection.query(sql, params, function (err, result) {
      connection.end();
      if (err) {
          res.json({ code: 500, msg: "操作失败", err: err });
      }
      res.json({ code: 200, msg: "操作成功", err: err });
  });
  
  console.log('是否有输出');
});

router.post('/delete', function (req, res, next) {
  var product = req.body;
  var sql = 'delete from product where id=?';
  var params = [product.id];
  var connection = mysql.createConnection(base.mysqlConfig);
  connection.connect();
  connection.query(sql, params, function (err, result) {
      connection.end();
      if (err) {
          res.json({ code: 500, msg: "操作失败", err: err });
      }
      res.json({ code: 200, msg: "操作成功", err: err });
  });
  
  console.log('是否有输出');
});

router.post('/edit', function (req, res, next) {
  var product = req.body;
  var sql = 'update product set title=?, price=?, lights=?, party=?, color=?, image=?, content1=?, content2=?, bigimage=?, updatedate=sysdate() where id=?';
  var params = [product.title, product.price, product.lights, product.party, product.color, product.image, product.content1, product.content2, product.bigimage, product.id];
  var connection = mysql.createConnection(base.mysqlConfig);
  //res.json(product);
  connection.connect();
  connection.query(sql, params, function (err, result) {
      connection.end();
      if (err) {
          res.json({ code: 500, msg: "操作失败", err: err });
      }
      res.json({ code: 200, msg: "操作成功", err: err });
  });
  
  console.log('是否有输出');
});


router.post('/addtest', function(req, res, next) {
  //res.send('respond with a products');
  //res.send('respond with a products2');
  var connection = mysql.createConnection(base.mysqlConfig);
  connection.connect();

  var productAddSql = "insert into product(title, price, createdate, updatedate) values(?, ?, sysdate(), sysdate())";

  var productAddSql_Params = ['test product', 10];

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

  console.log(mysql); 
  res.send('success');
  
});

module.exports = router;


function addProduct() {
  var connection = mysql.createConnection(base.mysqlConfig);
  connection.connect();

  var productAddSql = "insert into product(title, price, createdate, updatedate) values(?, ?, sysdate(), sysdate())";

  var productAddSql_Params = ['test product', 10];

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


