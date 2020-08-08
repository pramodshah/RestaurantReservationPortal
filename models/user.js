var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var UserSchema =  new mongoose.Schema({
    name :{
        type: String,
        required:true

    },
    email :{
        type:String,
        required:true
    },
    password :{
        type :String,
        required :true
    },
    data :{
        type :Date,
        default :Date.now
    }
});



var User = mongoose.model('User',UserSchema);

module.exports = User;