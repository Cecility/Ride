exports.view = function(req, res, next) {
	res.render('index');
}

var sess;
exports.createUser = function(req,res,next){

	sess = req.session;
	sess.loggedin = "1";


	res.sendStatus(200);
	console.log("reached login route");

}