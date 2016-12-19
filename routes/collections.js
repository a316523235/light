var mysql = require('mysql');
var express = require('express');
var base = require('../bll/base.js');
var router = express.Router();
var menu = require('../bll/menu.js');
var menuObj = new menu();

router.get('/list/:type', function(req, res, next) {
  var type = req.params.type || '';
  var q = req.query.q || 'all';
  var newUrl = '/collections/list/' + type + '/' + q;
  res.redirect(newUrl);
});

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
    case 'title':
      where += " and {0} like '%{1}%' ".replace('{0}', type).replace('{1}', type2);
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
  var sqldate = "select * from product " + where + ' order by createdate desc ' + limit;
  
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
          var jsn = { code: 200, msg: '操作成功', title: 'Express', name: 'Ice', menus: menuObj.menus, type: type, type2: type2, total: result2[0].total, lstProduct: date, query: sqldate, page: page, pagesize: pagesize };
          res.render('collections', jsn);
          //res.json(jsn);
        }
      });   
    }
  });
});

router.get('/detail/:type/:type2', function(req, res, next) {
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
  var sqldate = "select * from product " + where + ' order by createdate desc ' + limit;
  
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
          var jsn = { code: 200, msg: '操作成功', title: 'Express', name: 'Ice', menus: menuObj.menus, type: type, type2: type2, total: result2[0].total, lstProduct: date, query: sqldate, page: page, pagesize: pagesize };
          res.render('detail', jsn);
          //res.json(jsn);
        }
      });   
    }
  });
});

module.exports = router;

