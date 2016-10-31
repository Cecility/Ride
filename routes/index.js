var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title1: 'Calvin' });
});

/* GET home page. */
router.get('/main', function(req, res, next) {
	res.render('main');
});


module.exports = router;
