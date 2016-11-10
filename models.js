
var Mongoose = require('mongoose');


var userSchema = new Mongoose.Schema({
  // fields are defined here
  name: string,
  email: string,
  pic: string
});

//exports.Project = Mongoose.model('user', userSchema);


var user = mongoose.model('user', userSchema);