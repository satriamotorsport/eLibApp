const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to mongoDB
mongoose.connect(config.database, { useNewUrlParser: true });
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to Mongo Database');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

// app instantiate
const app = express();

// define routing
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

// set routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
