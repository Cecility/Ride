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
	var newRide = new models.ride({
        "username": "Hansol You",
        "email": "h5you@ucsd.edu",
        "driveid": "1234"
	});

	res.send(newRide);

	// newUser.save(afterSaving);


	// function afterSaving(err){ // this is a callback
	// 	if(err) { console.log(err); res.send(500); }
	// 	res.redirect('/main'); // redirect to main page if create successfully
	// }
}