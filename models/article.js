var mongoose = require('mongoose');
const uid2 = require('uid2');

var articleSchema = mongoose.Schema({
    title : String,
    image : String,
    description: String,
    content : String
 });

 var ArticleModel = mongoose.model('articles', articleSchema);

 module.exports = ArticleModel