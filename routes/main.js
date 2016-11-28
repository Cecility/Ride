var fs = require('fs');
var models = require('../models');

var sess;

exports.view = function(req, res, next) {
	sess = req.session;
    var uid = sess.uid;
	console.log("logged in? " + sess.loggedin);

	console.log("logged in username is: " + sess.username);
	console.log("logged in email is: " + sess.email);

	if(sess.loggedin){
		var data2 = JSON.parse(fs.readFileSync('data.json', 'utf8'));
		// console.log(data)
		// console.log('in');


		models.drive2.find({}, function(err, dbdrivedata){
			if (err){
				throw err;
			}

			models.user.find({_id: uid}, function(err, dbuserdata){
				if (err){
					throw err;
				}
                data = dbuserdata;

	            var data;
	            for(var i = 0; i < dbuserdata.length; i++){
	                if(dbuserdata[i].email == sess.email){
	                    data = dbuserdata[i];
	                }
	            }

				res.render('main', { userprofile: data , dbdrive: dbdrivedata, dbuser: dbuserdata, userprofile2: data2 });
			});
		});
	}

	else{
		res.redirect('/');
	}

};

exports.view2 = function(req, res, next) {
	sess = req.session;
    var uid = sess.uid;
	console.log("logged in? " + sess.loggedin);

	console.log("logged in username is: " + sess.username);
	console.log("logged in email is: " + sess.email);

	if(sess.loggedin){
		var data2 = JSON.parse(fs.readFileSync('data.json', 'utf8'));
		// console.log(data)
		// console.log('in');


		models.drive2.find({}, function(err, dbdrivedata){
			if (err){
				throw err;
			}

			models.user.find({_id: uid}, function(err, dbuserdata){
				if (err){
					throw err;
				}
                data = dbuserdata;

	            var data;
	            for(var i = 0; i < dbuserdata.length; i++){
	                if(dbuserdata[i].email == sess.email){
	                    data = dbuserdata[i];
	                }
	            }

				res.render('mainA', { userprofile: data , dbdrive: dbdrivedata, dbuser: dbuserdata, userprofile2: data2 });
			});
		});
	}

	else{
		res.redirect('/');
	}

};