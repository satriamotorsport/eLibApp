const router = require('express').Router();

// Book model
let Book = require('../models/book');

// GET books listing
router.get('/', function(req, res, next) {  
   Book.find({},function (err, bookList) {
    if(err){
      console.log(err);
    }
    else{      
      res.render('books', {
        page:'Book Management', 
        menuId:'books', 
        books: bookList
      });
    }
  })  
});

router.get('/add', function(req, res, next) {  
      res.render('add_book', {
        page:'Add New Book', 
        menuId:'addbook'
      });
});

module.exports = router;
