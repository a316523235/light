var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var qr = require('qr-image');

router.post('/add', function(req, res, next) {
  //res.render('picture/add', { title: "上传图片" });
  res.json({ code: 200, msg: 'test' });
});

router.get('/qrcode', function(req, res, next) {
  var text = req.query.text;
  try {
  	var img = qr.image(text,{size :10});
  	res.writeHead(200, {'Content-Type': 'image/png'});
	img.pipe(res);
  } catch (e) {
    res.writeHead(414, {'Content-Type': 'text/html'});
    res.end('<h1>414 Request-URI Too Large</h1>');
  }
});

module.exports = router;