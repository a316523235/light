var express = require('express');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + file.originalname.substring(file.originalname.indexOf('.')))
  }
});
var upload = multer({ storage: storage}).single('image');
//var upload = multer({dest: 'public/uploads/'});
var mysql = require('mysql');
var base = require('../bll/base.js');
var router = express.Router();


router.get('/products/add', function(req, res, next) {
  res.render('product/add', { title: "后台 - 添加商品" });
  //res.json({ a: "test" });
});

router.get('/products/manage', function(req,res, next) {
  res.render('product/manage', {title: "后台 - 商品管理"})
});

router.get('/products/edit/:id', function (req, res, next) {
  var connection = mysql.createConnection(base.mysqlConfig);

  var id = req.params.id;
  var sql = 'select * from product where id=?';
  var params = [id];
  connection.connect();
  connection.query(sql, params, function(err, result) {
    connection.end();
    if(err) {
      res.json({code: 500, msg: "获取商品失败", err: err});
      return;
    }
    if(result.length == 0) {
      res.json({code: 500, msg: "商品不存在", err: err});
      return;
    } else {
      res.render('product/edit', {title: "后台 - 修改商品", product: result[0] });
    }
  });
});

router.get('/picture/add', function(req, res, next) {
  res.render('picture/add', { title: "上传图片",  result: { code: 200, msg: "", imageUrl: "", hide: "none" }} );
});

router.post('/picture/add', function(req, res, next) {
  //var t = req.files[0];
  //console.log('this is file log');
  //console.log(req.file);
  upload(req, res, function(err) {
    if(err) {
      res.json({code: 500, msg: "保存失败", err: err });
      return;
    }
    res.render('picture/add', { title: "上传图片", result: { code: 200, msg: "上传成功", imageUrl: req.file.filename, hide: "" }});
  });
});

module.exports = router;
