var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    google:{
        id: String,
        token: String,
        email: Stirng,
        name: String
    }
})