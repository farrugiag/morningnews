var express = require('express');
var router = express.Router();
const UserModel = require ("../models/user")

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
    token : uid2(32)
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
  if (bcrypt.compareSync(password, userFind.password)){
    console.log("trueeeee")
    res.json({
      login : true, 
      user : {username : userFind.username, token : userFind.token}
    })
    return
  }
  res.json({login : false})
})

module.exports = router;
