exports.view = function(req, res, next) {
	var fs = require('fs');
	var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	console.log(data)
	res.render('addGroup', { userprofile: data });
};

/*exports.addGroup = function(req, res) {
		var location = {'pickupX': req.query.x, 'pickupY': req.query.y};

	addGroup.drives.push(location);
}
*/
