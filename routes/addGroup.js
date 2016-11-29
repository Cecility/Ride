var sess;
exports.view = function(req, res, next) {
	res.render('addGroup');
};

var models = require('../models');



exports.create = function(req, res){
	    sess = req.session;
	var newDrive = new models.drive2({
        "username": sess.username,
        "email": sess.email,
        "time": req.body.time,
        "dates": req.body.dates,
        "pickup": req.body.pickup,
        "pickupLong": req.body.pickupLong,
        "pickupLat": req.body.pickupLat,
        "dropoff": req.body.dropoff,
        "dropoffLong": req.body.dropoffLong,
        "dropoffLat": req.body.dropoffLat,
        "riders": []
	});


	console.log(sess.username);

	newDrive.save(afterSaving);


    function afterSaving(err){ // this is a callback
		if(err) {
			console.log(err); res.send(500);
		}
        
        sess.addSuccess = "Ride group created sucessfully. You can see it in Find a Ride";
		res.sendStatus(304); // redirect to main page if create successfully
	}
}