var fs = require('fs');
var models = require('../models');

var sess;

exports.view = function(req, res, next) {
	sess = req.session;
    var uid = sess.uid;
	console.log("logged in? " + sess.loggedin);

	console.log("logged in username is: " + sess.username);
	console.log("logged in email is: " + sess.email);

	if(sess.loggedin){
		var data2 = JSON.parse(fs.readFileSync('data.json', 'utf8'));
		// console.log(data)
		// console.log('in');


		models.drive2.find({}, function(err, dbdrivedata){
			if (err){
				throw err;
			}

			models.user.find({_id: uid}, function(err, dbuserdata){
				if (err){
					throw err;
				}
                data = dbuserdata;

	            var data;
	            for(var i = 0; i < dbuserdata.length; i++){
	                if(dbuserdata[i].email == sess.email){
	                    data = dbuserdata[i];
	                }
	            }

				res.render('main', { userprofile: data , dbdrive: dbdrivedata, dbuser: dbuserdata, userprofile2: data2, userid: uid });
			});
		});
	}

	else{
		res.redirect('/');
	}

};

exports.view2 = function(req, res, next) {
	sess = req.session;
    var uid = sess.uid;
	console.log("logged in? " + sess.loggedin);

	console.log("logged in username is: " + sess.username);
	console.log("logged in email is: " + sess.email);

	if(sess.loggedin){
		var data2 = JSON.parse(fs.readFileSync('data.json', 'utf8'));
		// console.log(data)
		// console.log('in');


		models.drive2.find({}, function(err, dbdrivedata){
			if (err){
				throw err;
			}

			models.user.find({_id: uid}, function(err, dbuserdata){
				if (err){
					throw err;
				}
                data = dbuserdata;

	            var data;
	            for(var i = 0; i < dbuserdata.length; i++){
	                if(dbuserdata[i].email == sess.email){
	                    data = dbuserdata[i];
	                }
	            }

				res.render('mainA', { userprofile: data , dbdrive: dbdrivedata, dbuser: dbuserdata, userprofile2: data2 });
			});
		});
	}

	else{
		res.redirect('/');
	}

};

exports.leaveGroup = function (req, res){
    var sess = req.session;
    var groupId = req.body.groupId; // Get id of group to be removed
    var uid = sess.uid; // Get unique id of current user
    var rmIndex;
    var currGroupId =[];
    
    // Find data of current user by unique id on MongoDb
    models.user.find({'_id':uid}, function(err, userData){
        if(userData.length > 0){
            // Checking if user data is empty
            for(var i = 0; i < userData[0].groups.length; i++){
                // Copy user's ride group ids
                currGroupId[i] = userData[0].groups[i];
            }

            // Finding index of groupId to be removed from user's database
            rmIndex = currGroupId.indexOf(groupId);

            // DEBUG STATEMENTS DELETE WHEN DONE
            console.log('OLD user belongs to group ' + JSON.stringify(currGroupId));
            console.log('Group to be removed is ' + groupId);
            console.log('Removing group at index ' + rmIndex);            

            // Removing Group
            currGroupId.splice(rmIndex, 1);
            
            // DEBUG STATEMENT. DELETE WHEN DONE
            console.log('NEW user belongs to group ' + JSON.stringify(currGroupId));
            
            models.user.find({'_id':uid}).update({'groups':currGroupId}).exec(afterDelete);
        }
        
        // Handle user not found error
        else{
            console.log('User not found. main.js: 92');
            console.log(err);
        }
        
        function afterDelete(err){
            if(err){
                console.log('Database Update Exec Failed. main.js:122');
                console.log(err);
                res.send(500);
            }
            else
                res.redirect('/main');
        }
    });
};