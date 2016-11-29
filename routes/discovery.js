var fs = require('fs');
var models = require('../models');
var sess;
exports.view = function(req, res, next) {
    sess = req.session;
    
	//data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	// console.log(data)
	// console.log('in');

	models.drive2.find({}, function(err, dbdrivedata){
		if (err){
			throw err;
		}

		models.user.find( {}, function(err, dbuserdata){
			if (err){
				throw err;
			}
            
            // console.log('this is what dbuserdata loosk like ' + dbuserdata);
            var data;
            console.log("my session id is " + sess.uid);
            console.log("my email is " + sess.email);

            for(var i = 0; i < dbuserdata.length; i++){
                // console.log("I'm comparing " + dbuserdata[i].email);
                if(dbuserdata[i].email == sess.email){
                    // console.log('im in here '+ sess.email);
                    data = dbuserdata[i];
                }
            }
            
            console.log("data is " + data);
            
            res.render('discovery', { userprofile: data , dbdrive: dbdrivedata, dbuser: dbuserdata, messages:req.flash('joinGroupMsg') });
		});
	});
};

exports.view2 = function(req, res, next) {
    sess = req.session;
    
    data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    // console.log(data)
    // console.log('in');

    models.drive2.find({}, function(err, dbdrivedata){
        if (err){
            throw err;
        }

        models.user.find( {}, function(err, dbuserdata){
            if (err){
                throw err;
            }
            
            // console.log('this is what dbuserdata loosk like ' + dbuserdata);
            var data;
            // console.log("my session id is " + sess.id);
            // console.log("my email is " + sess.email);
            for(var i = 0; i < dbuserdata.length; i++){
                // console.log("I'm comparing " + dbuserdata[i].email);
                if(dbuserdata[i].email == sess.email){
                    // console.log('im in here '+ sess.email);
                    data = dbuserdata[i];
                }
            }
            
            console.log("data is " + data);
            
            res.render('discoveryA', { userprofile: data , dbdrive: dbdrivedata, dbuser: dbuserdata });
        });
    });
};

exports.create = function (req, res){
    sess = req.session;
    var groupId = req.body.groupId;
    var currGroupId = [];
    
    var userId = sess.uid;
    console.log('The id of the user is ' + userId);
    
    var currRidersId = [];
    
    models.drive2.find({'_id':groupId}, function(err, userData){
       
        if(userData.length>0){
            for(var i=0; i<userData[0].riders.length; i++){
                currRidersId[i] = userData[0].riders[i];
                console.log("currently adding userId " + currRidersId[i]);
            }
            
            if(currRidersId.indexOf(userId) == -1){
                currRidersId[currRidersId.length] = userId;
                console.log('UserId to be uploaded ' + userId);
            }
            
            else
                console.log(userId + " already exist");
            
            models.drive2.find({'_id':groupId}).update({'riders':currRidersId}).exec(function(){console.log("Added rider id");});
        }
        
        else{
            console.log('Ride group requested doese not exist');
            console.log(err);
        }
           
    });
    
    models.user.find({'_id': userId}, function(err, userData){
        console.log('userId we are finding is ' + userId);
        // Check if userData is not empty, meaning user exists
        if (userData.length > 0){
            
            // Query and make copy of current user data from mongoose
            for(var i = 0; i < userData[0].groups.length; i++){
                // Copy user's ride group ids
                currGroupId[i] = userData[0].groups[i];
                console.log("currently adding groupId  " + currGroupId[i]);
            }
            
            // If user is not within the group
            if(currGroupId.indexOf(groupId) == -1){
                // add user to the group
                currGroupId[currGroupId.length] = groupId;
                req.flash('joinGroupMsg', 'Successfully joined group');
                console.log("GroupId to be uploaded " + currGroupId);
            }
            
            // else user already in the goup. Do nothing
            else{
                req.flash('joinGroupMsg', 'Already in the group');
                console.log(groupId + " already exist");
                afterUpdating;
            }
        
        
            models.user.find({'_id': userId}).update({"groups": currGroupId}).exec(afterUpdating);
        }
        
        else{
            console.log("user does not exist on database");
            console.log(err);
        }
    
    function afterUpdating(err){
		if(err) { console.log(err); res.send(500); }
		res.redirect('/discovery'); 
    }   
    });
};