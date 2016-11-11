var models = require('../models');

exports.view = function(req, res, next) {
	var fs = require('fs');
	var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	console.log(data)
	console.log('in');
	res.render('discovery', { userprofile: data });
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