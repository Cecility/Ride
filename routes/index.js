var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

/* GET home / main / groups page. */
router.get('/main', function(req, res, next) {
	var fs = require('fs');
	var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	console.log(data)
	res.render('main', { userprofile: data });
});

/* GET discovery page. */
router.get('/discovery', function(req, res, next) {
	var fs = require('fs');
	var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	console.log(data)
	res.render('discovery', { userprofile: data });
});


/* GET settings page. */
router.get('/settings', function(req, res, next) {
	var fs = require('fs');
	var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	console.log(data)
	res.render('settings', { userprofile: data });
});


module.exports = router;
