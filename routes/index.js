var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title1: 'Calvin' });
});

/* GET home page. */
router.get('/data', function(req, res, next) {
	var fs = require('fs');
	var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	console.log(data)
	res.render('friends', { listofdata: data });
});


module.exports = router;
