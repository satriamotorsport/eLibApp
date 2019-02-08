var router = require('express').Router();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { page: 'Home', menuId: 'home' });
});

router.get('/about', isLoggedIn, function(req, res, next) {
  res.render('about', {page:'About Us', menuId:'about'});
});

router.get('/contact', isLoggedIn, function(req, res, next) {
  res.render('contact', {page:'Contact Us', menuId:'contact'});
});

function isLoggedIn(req, res, next){  
  if(req.isAuthenticated()){
    next();
  }
  else{
    res.redirect("/users/login");
  }
}

module.exports = router;
