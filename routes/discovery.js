exports.view = function(req, res, next) {
	var fs = require('fs');
	var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	console.log(data)
	console.log('in');
	res.render('discovery', { userprofile: data });
};
