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
        "time": "9:00PM",
        "dates": [1, 0, 1, 0, 1, 0, 0],
        "pickup": "Costa Verde",
        "dropoff": "Muir College"
	});


	res.send(req.body.days);


// exports.create = function(req, res){
// 	var newRide = new models.ride({
//         "username": "Hansol You",
//         "email": "h5you@ucsd.edu",
//         "driveid": "1234"
// 	});


// 	res.send(req.body.days);

	// newUser.save(afterSaving);


	// function afterSaving(err){ // this is a callback
	// 	if(err) { console.log(err); res.send(500); }
	// 	res.redirect('/main'); // redirect to main page if create successfully
	// }
}