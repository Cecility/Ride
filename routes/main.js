var fs = require('fs');
var models = require('../models');

exports.view = function(req, res, next) {
	var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	console.log(data)
	console.log('in');


	models.drive.find({}, function(err, dbdrivedata){
		if (err){
			throw err;
		}

		models.user.find({}, function(err, dbuserdata){
			if (err){
				throw err;
			}

			res.render('main', { userprofile: data , dbdrive: dbdrivedata, dbuser: dbuserdata });
		});
	});

};


//exports.view = function(req, res){
	/*models.createRide
		.find()
		.sort('-time')
		.exec(displayRide);

		function displayRide(err, list_rides){
		}*/

//		res.send(models.createRide);

//}