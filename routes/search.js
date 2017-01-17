var mysql = require('mysql');
var express = require('express');
var base = require('../bll/base.js');
var router = express.Router();
var menu = require('../bll/menu.js');
var menuObj = new menu();

router.get('', function(req, res, next) {
  var q = req.query.q || 'all';
  var newUrl = '/collections/list/title/' + q;
  res.redirect(newUrl);
});



module.exports = router;
