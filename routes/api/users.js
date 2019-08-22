var express = require('express');
var router = express.Router();
var User = require('../../models/User');
var auth = require('../../utils/verifyToken');


// import bcrypt for password
var bcrypt = require('bcrypt');

// import jwt for tokens
var jwt = require('jsonwebtoken');


 // routes for user registration

router.post('/register', (req, res) => {
  User.create(req.body, (err, user) => {
    if(err) return res.status(500).json({success: false,err});
    jwt.sign({userId: user.id}, process.env.SECRET, (err, token) => {
      if(err) return res.json({succees: false});
      return res.status(201).json({success:true, message: "user registered" ,token: token});
    })
  })
})

//For currently LoggedIn user

router.get('/me',auth.verifyToken, (req,res) => {
  console.log(req.user, "/me....")
  User.findById(req.user._id, (err, user) => {
    if(err) return res.json({success:false, err });
    return res.status(201).json({ success:true, user: user });
  })
})

router.post('/login', (req, res) => {
  const data = req.body;
  console.log("test user info... ",data);
  User.findOne({ email: data.email }, (err, user) => {
    if (err) return res.status(500).json({ success: false, error: "server error" });
    if(!user) {
      return res.status(400).json({ success: false, error: "user doesn't exist" });
    }
    console.log(user, "user login");
    if(user){
      console.log(user.company,data.company, "checkpoint for User")
      if(user.company==data.company){
        var result = bcrypt.compareSync(data.password, user.password);
        if(result){
          var token = jwt.sign({ _id: user._id }, process.env.SECRET);
          console.log(token);
          return res.status(200).json({success: true,token: token, user});
        }else {
          return res.status(400).json({success: false, error: "invalid password" });
        }
      }else {
        return res.status(500).json({
          succees: false,
          error:"You doesn't exist in this organisation"
        })
      }
    }
 })
})

router.use(auth.verifyToken);

// singleUser
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id , (err,user)=> {
    if(err) return res.status(500).json({success:false, message: "server error",err});
    if(user){
      return res.status(200).json({success: true, message:"", user});
    }
  })
});


// user edit and update
router.put('/update/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true } ,(err,user)=> {
    if(err) return res.status(500).json({success:false, message: "server error",err});
    if(user){
      return res.status(200).json({success: true, message:"user updated", user});
    }
  })
});



// delete users
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id,req.body ,(err,user)=> {
    if(err) return res.status(500).json({success:false, message: "server error",err});
    if(user){
      return res.status(200).json({success: true, message:"user updated", user});
    }
  })
});


// update score for specific user
router.post('/:id/increasescore', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id,{$inc: {score: 1}}, { new: true } ,(err,user)=> {
    if(err) return res.status(500).json({success:false, message: "server error",err});
    if(user){
      return res.status(200).json({success: true, message:"user score updated", user:user});
    }
  })
});

module.exports = router;