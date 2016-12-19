var express = require('express');
var menu = require('../bll/menu.js');
var menuObj = new menu();
var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('menu' + menuObj.menus);
});



module.exports = router;
