var models = require('../models');

exports.view = function(req, res, next) {
	res.render('index');
}

var sess;
exports.create = function(req, res, next){

    console.log("called create");
    
	sess = req.session;
	sess.loggedin = "1";
	sess.username = req.body.username;
	sess.email = req.body.email;
	sess.pic = req.body.pic;
    
    console.log(req.body.pic);

	models.user.find({}, function(err, userData){
		if (err){
			throw err;
		}
    


		var userExist = "0";

		for(var i = 0; i < userData.length; i++){
            console.log("trying to set userExist");
			if(userData[i].email == sess.email){
				userExist = "1";
                sess.uid = userData[i]._id;
                console.log("user exists!");
			}
		}

		if(userExist == "0"){
            console.log('creating new user '+ sess.username);
			var newUsers = new models.user({
			    "username": sess.username,
			    "email": sess.email,
			    "pic": sess.pic,
			    "groups": []
			});


			console.log("newUsers is " + newUsers);


			newUsers.save(afterSaving);

		}

		else{
            console.log('User exists. We checked in controller');
			res.sendStatus(200);
		}


		//res.sendStatus(200);
		console.log("reached login route");


		function afterSaving(err){ // this is a callback
			if(err) {
				console.log(err); res.send(500);
			}
            models.user.find({}, function(err, userData){
                for(var i = 0; i < userData.length; i++){
                    if(userData[i].email == sess.email){
                        sess.uid = userData[i]._id;
                        console.log('user id is '+ userData[i]._id + ' sees.uid is '+ sess.uid);
                    }
		        }

			res.redirect('/main');
        });
        }

	});	
}