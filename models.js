
var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    "username": String,
    "email": String,
    "pic": String,
    "groups": [String]
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
    "time": String,
    "dates": [Number],
    "pickup": String,
    "pickupLong": String,
    "pickupLat": String,
    "dropoff": String,
    "dropoffLong": String,
    "dropoffLat": String,
    "riders": [String]
	}, {
	collection: "drives"
});

var driveSchema2 = new mongoose.Schema({
    "username": String,
    "email": String,
    "time": String,
    "dates": [Number],
    "pickup": String,
    "pickupLong": String,
    "pickupLat": String,
    "dropoff": String,
    "dropoffLong": String,
    "dropoffLat": String,
    "riders": [String]
    }, {
    collection: "drives2"
});



exports.user = mongoose.model('users', userSchema);
exports.ride = mongoose.model('rides', rideSchema);
exports.drive = mongoose.model('drives', driveSchema);
exports.drive2 = mongoose.model('drives2', driveSchema2);