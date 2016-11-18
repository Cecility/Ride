var models = require('../models');

exports.view = function(req, res, next) {
	res.render('index');
}

var sess;
exports.create = function(req, res, next){

	sess = req.session;
	sess.loggedin = "1";
	sess.username = req.body.username;
	sess.email = req.body.email;
	sess.pic = req.body.pic;


	models.user.find({}, function(err, userData){
		if (err){
			throw err;
		}


		var userExist = "0";

		for(var i = 0; i < userData.length; i++){
			if(userData[i].email == sess.email){
				userExist = "1";
			}
		}

		if(userExist == "0"){
			res.sendStatus(200);
		}

		else{
			var newUsers = new models.user({
			    "username": sess.username,
			    "email": sess.email,
			    "pic": sess.pic,
			    "groups": []
			});


			console.log("newUsers is " + newUsers);


			newUsers.save(afterSaving);
		}


		//res.sendStatus(200);
		console.log("reached login route");


		function afterSaving(err){ // this is a callback
			if(err) {
				console.log(err); res.send(500);
			}

			res.redirect('/main');
		}

	});
	
}