const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

// User model
let User = require('../models/user');

router.use(require('cookie-parser')());

// body parser
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Passport Config
require('../config/passport')(passport);
// Passport Middleware
router.use(passport.initialize());
router.use(passport.session());

// flash message
router.use(flash());
router.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

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
          //req.flash('success','You are now registered and can log in');
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
    menuId:'users'
  });
});

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    console.log(user);
    if (err) { 
      return next(err); 
    }
    if (!user) { 
      return res.redirect('/users/login'); 
    }
    req.logIn(user, function(err) {
      if (err) { 
        return next(err); 
      }
      return res.redirect('/about');
    });
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  console.log(req.isAuthenticated());
  req.logout();
  //req.flash('success', 'You are logged out');  
  console.log('User has been logout successfully');
  res.redirect('/users/login');
});

/* function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    next();
  }
  else{
    res.redirect("/users/login");
  }
} */

module.exports = router;
