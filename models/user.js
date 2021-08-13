var mongoose = require('mongoose');
const uid2 = require('uid2');

var userSchema = mongoose.Schema({
    username : String,
    password : String,
    email: String,
    userArticles : [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' }],
    token : String
 });

 var UserModel = mongoose.model('users', userSchema);

 module.exports = UserModel