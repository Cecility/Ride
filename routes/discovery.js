var fs = require('fs');
var models = require('../models');

exports.view = function(req, res, next) {
	var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	console.log(data)
	console.log('in');
	models.drive.find({}, function(err, dbdata){
	
		if (err){
			throw err;
		}
		else{
		res.render('discovery', { userprofile: data , dbprofile: dbdata });
		}
	});
};
