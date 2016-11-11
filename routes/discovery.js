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

			res.render('discovery', { userprofile: data , dbdrive: dbdrivedata, dbuser: dbuserdata });
		});
	});



};
