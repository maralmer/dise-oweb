var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('quienessomos', { title: 'Quienes Somos' });
});

module.exports = router;
