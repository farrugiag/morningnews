var express = require('express');
var router = express.Router();
const UserModel = require ("../models/user")
const ArticleModel = require("../models/article")

const bcrypt = require('bcrypt')
const uid2 = require('uid2')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign-up', async function(req, res, next){
  const email = req.body.email
  const password = req.body.password
  const username = req.body.username
  console.log("REQBODY", req.body)
  const newUserFind = await UserModel.findOne({ $or : [{email : email}, {username : username}]}) 
  console.log("NEW USER FIND",newUserFind)
  if (newUserFind){
    res.json({result : !!newUserFind})
    return
  }
  const hash = bcrypt.hashSync(password,10)
  const newUser = new UserModel({
    username : username,
    email : email,
    password : hash,
    userArticles : [],
    token : uid2(32),
    language : 'language=fr&country=fr'
  })
  const newUserSaved = await newUser.save()
  res.json({result : !!newUserFind , user : {username : newUserSaved.username, token : newUserSaved.token}})
})

router.post('/sign-in', async function(req, res, next){
  const email = req.body.email
  const password = req.body.password
  console.log("req.body",req.body)
  const userFind = await UserModel.findOne({email : email}) 
  console.log("signin", userFind)
  if(userFind){
    if (bcrypt.compareSync(password, userFind.password)){
      console.log("trueeeee")
      res.json({
        login : true, 
        user : {username : userFind.username, token : userFind.token}
      })
      return
    } 
  }
  res.json({login : false})
})

router.post('/add-article', async function(req, res, next) {
  const title = req.body.title
  const image = req.body.image
  const description = req.body.description
  const content = req.body.content
  const token = req.body.token
  console.log("req.body add-article", req.body)
  const articleFind= await ArticleModel.findOne({title:title})
  console.log("articleFind", articleFind)
  // if (articleFind){
  //   res.json({result: !!articleFind, message : "ici"})
    
  // }
  const newArticle = new ArticleModel( {
    title : title,
    image: image,
    description: description,
    content: content
  })
  const articleSaved = await newArticle.save()
  const user = await UserModel.findOne({token : token})
  // user.userArticles.push(articleSaved._id)
  const userUpdated = await UserModel.updateOne({_id : user._id}, {userArticles : [...user.userArticles, articleSaved._id]})
  const userWishListUpdated = await UserModel.findById(user._id)
  var userPopulate= await UserModel.findById(user._id).populate('userArticles')
  res.json({result : true, idArticleSaved : articleSaved._id, userWishList : userPopulate.userArticles})
})

router.post('/begin-user-wish-list', async function (req, res, next) {
  console.log("fonction lancée begin ", req.body)
  const token = req.body.token
  const user = await UserModel.findOne({token : token}).populate('userArticles')
  console.log("user", user)
  if (user){
    res.json({resultat : "token existe" ,userWishList : user.userArticles})
  return
  }
  res.json({resultat : "token n'existe pas"})

})

router.post('/delete-article', async function (req, res, next) {
  const idArticle = req.body.id
  const articleDelete= await ArticleModel.deleteOne({ _id : idArticle })
  res.json({result: true})
})

router.post('/language', async function (req, res, next) {
  console.log("req.body language", req.body.language)
  const language = `language=${req.body.language}&country=${req.body.country}`
  const token = req.body.token 
  const languageUpdate = await UserModel.updateOne({token: token}, {language:language})
  const user = await UserModel.findOne({token: token})
  res.json ({language : user.language})
})

router.post('/language-first', async function (req, res, next){
  const token= req.body.token
  const user = await UserModel.findOne({token: token})
  console.log("user first", user)
  res.json ({language: user.language})
})

module.exports = router;
