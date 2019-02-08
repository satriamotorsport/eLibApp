const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
let User = require('../models/user');

// GET users listing
router.get('/', function(req, res, next) {  
   User.find({},function (err, userList) {
    if(err){
      console.log(err);
    }
    else{
      res.render('users', {
        page:'User Management', 
        menuId:'users', 
        users: userList
      });
    }
  })  
});

// Register Form
router.get('/register', function(req, res){
  res.render('register', {    
      page:'Register User', 
      menuId:'users', 
  });
});

// Proceed registration
router.post('/register', function(req, res){  
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;   
  
  let newUser = new User({
    name:name,
    email:email,
    username:username,
    password:password
  });

  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
      if(err){
        console.log(err);
      }
      newUser.password = hash;
      newUser.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          req.flash('success','You are now registered and can log in');
          res.redirect('/users/login');
        }
      });
    });
  });
});

// Login Form
router.get('/login', function(req, res){
  res.render('login', {
    page:'Login', 
    menuId:'users',
    message: req.flash('loginMessage')
  });
});

// Login Process
router.post('/login', function(req, res, next){  
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/login',
    failureFlash: true
})(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  console.log(req.isAuthenticated());
  req.logout();
  req.flash('success', 'You are logged out');  
  console.log('User has been logout successfully');
  res.redirect('/users/login');
});

module.exports = router;
