exports.view = function(req, res, next) {
	res.render('addGroup');
    
};

/*exports.addGroup = function(req, res) {
		var location = {'pickupX': req.query.x, 'pickupY': req.query.y};

	addGroup.drives.push(location);
}
*/

var models = require('../models');



exports.create = function(req, res){
	var newDrive = new models.drive({
        "username": "Hansol You",
        "email": "h5you@ucsd.edu",
        "driveid": "1234",
        "time": req.body.time,
        "dates": req.body.dates,
        "pickup": req.body.pickup,
        "dropoff": req.body.dropoff
	});


	//res.send(req.body.days);

	//console.log(req.body.days);

	//res.send(req.body);

	console.log(req.body);

// exports.create = function(req, res){
// 	var newRide = new models.ride({
//         "username": "Hansol You",
//         "email": "h5you@ucsd.edu",
//         "driveid": "1234"
// 	});


	//res.send(req.body.days);

	newDrive.save(afterSaving);


	function afterSaving(err){ // this is a callback
		if(err) { console.log(err); res.send(500); }
		res.redirect('/main'); // redirect to main page if create successfully
	}
}