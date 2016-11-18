exports.view = function(req, res, next) {
	res.render('index');
}

var sess;
exports.create = function(req,res,next){

	sess = req.session;
	sess.loggedin = "1";
	sess.username = req.body.username;
	sess.email = req.body.email;
	sess.pic = req.body.pic;

	var users = req.mongoose.users;

	for(var i = 0; i < users.length; i++){
		if(users[i].email == sess.email){
			res.sendStatus(200);
			break;
		}
	}

	var newUsers = new models.users({
	    "username": sess.username,
	    "email": sess.email,
	    "pic": sess.pic,
	    "groups": []
	});


	newUsers.save(afterSaving);



	//res.sendStatus(200);
	console.log("reached login route");


	function afterSaving(err){ // this is a callback
		if(err) {
			console.log(err); res.send(500);
		}
	}

}