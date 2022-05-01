var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    name :String ,
    email :{type : String , required :true ,unique: true},
    username :{type : String ,required : true ,unique: true},
     photo :{type: String }
},{timestamps : true})

var User = mongoose.model('User' ,userSchema);
module.exports = User;