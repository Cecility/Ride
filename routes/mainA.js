var fs = require('fs');
var models = require('../models');

var sess;

exports.view = function(req, res, next) {
	sess = req.session;
	console.log("logged in? " + sess.loggedin);

	if(sess.loggedin){
		var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
		// console.log(data)
		// console.log('in');


		models.drive2.find({}, function(err, dbdrivedata){
			if (err){
				throw err;
			}

			models.user.find({}, function(err, dbuserdata){
				if (err){
					throw err;
				}

				res.render('mainA', {  userprofile: data , dbdrive: dbdrivedata, dbuser: dbuserdata });
			});
		});
	}

	else{
		res.redirect('/');
	}

};