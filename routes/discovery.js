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
    var currGroupId = [];
    
    models.user.find({'_id':"582552e6dcba0f326cc71a6e"}, function(err, userData){
        if (userData.length > 0)
            currGroupId = userData[0].groups;
        
        else{
            console.log("user does not exist on database");
            console.log(err);
        }
    
        
        for(var i = 0; i < userData[0].groups.length; i++){
            currGroupId[i] = userData[0].groups[i];
            console.log("currently adding " + currGroupId[i]);
        }
        
        currGroupId[currGroupId.length] = groupId;
        console.log("to be uplaoded " + currGroupId);
        
         models.user.find({'_id': "582552e6dcba0f326cc71a6e"}).update({"groups": currGroupId}).exec(afterUpdating);
    
    function afterUpdating(err){
        if(err)
            console.log(err);
        else
            console.log("new id added was " + groupId);
    }   
    });

};