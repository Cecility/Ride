var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

/* GET home page. */
router.get('/main', function(req, res, next) {
	var fs = require('fs');
	var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	console.log(data)
	res.render('main', { listofdata: data });
});


module.exports = router;
