var fs = require('fs');
var models = require('../models');

exports.view = function(req, res, next) {
	var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	console.log(data)
	console.log('in');


	models.drive.find({}, function(err, dbdrivedata){
		if (err){
			throw err;
		}

		models.user.find({}, function(err, dbuserdata){
			if (err){
				throw err;
			}

			res.render('discovery', { userprofile: data , dbdrive: dbdrivedata, dbuser: dbuserdata });
		});
	});
};

exports.create = function (req, res){
    var groupId = req.body.groupId;
    models.user.find({'_id': "58255be0d9675d0012998223"}).update({"group": groupId}).exec(afterUpdating);
    
    function afterUpdating(err){
        if(err)
            console.log(err);
        else
            console.log(groupId);
    }
};