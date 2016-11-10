
var Mongoose = require('mongoose');


var ProjectSchema = new Mongoose.Schema({
  // fields are defined here
});

exports.Project = Mongoose.model('Project', ProjectSchema);


