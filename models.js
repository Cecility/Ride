
var mongoose = require('mongoose');


/*var userSchema = new mongoose.Schema({
  // fields are defined here
  name: String,
  email: String,
  pic: String
});*/

//exports.Project = Mongoose.model('user', userSchema);


//var user = mongoose.model('user', userSchema);

var userSchema = new mongoose.Schema({
    "username": String,
    "email": String,
    "pic": String 
	}, {
	collection: "users"
});

var rideSchema = new mongoose.Schema({
    "username": String,
    "email": String,
    "driveid": Number
	}, {
	collection: "rides"
});

var driveSchema = new mongoose.Schema({
    "username": String,
    "email": String,
    "driveid": Number, 
    "time": String,
    "dates": [Number],
    "pickup": String,
    "dropoff": String
	}, {
	collection: "drives"
});



exports.user = mongoose.model('users', userSchema);
exports.ride = mongoose.model('rides', rideSchema);
exports.drive = mongoose.model('drives', driveSchema);