var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');
var discovery = require('./routes/discovery');
var discoveryA = require('./routes/discovery');
var index = require('./routes/index');
var main = require('./routes/main');
var mainA = require('./routes/main');
var settings = require('./routes/settings');
var addGroup = require('./routes/addGroup');

var app = express();


require("dotenv").load();
var mongoose = require('mongoose');
var db = mongoose.connection;

// Database Connection
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URI);
db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
db.once('open', function(callback) {
    console.log("Database connected successfully.");
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret:'1321corgis'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//app.use('/', routes);
app.get('/', index.view);
app.get('/main', main.view);
app.get('/mainA', main.view2);
app.get('/discovery', discovery.view);
app.get('/discoveryA', discovery.view2);
app.get('/settings', settings.view);
app.get('/addGroup', addGroup.view);

app.post('/addGroup', addGroup.create);
app.post('/login', index.create);
app.post('/discovery/joinGroup', discovery.create);
app.post('/main/leaveGroup', main.leaveGroup);
app.post('/logout', function(req, res){
    var sess = req.session;
    sess.destroy();
    res.send(304);
});
// app.post('/index/login', index.create);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
