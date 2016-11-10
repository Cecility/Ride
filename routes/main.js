exports.view = function(req, res, next) {
	var fs = require('fs');
	var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	console.log(data)
	res.render('main', { userprofile: data });
};

var models = require('../models');

//exports.view = function(req, res){
	/*models.createRide
		.find()
		.sort('-time')
		.exec(displayRide);

		function displayRide(err, list_rides){
		}*/

//		res.send(models.createRide);

//}