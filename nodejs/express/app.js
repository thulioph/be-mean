// configurações do servidor.
var db = require('./config/db');
var express = require('express'); // modulo do express
var path = require('path'); // modulo de caminho independente da plataforma
var favicon = require('serve-favicon'); //
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var methodOverride = require("method-override");
var cors = require('cors');

var routes = require('./routes/index');
var users = require('./routes/users');
var beers = require('./modules/beers/routes'); // vai pegar o index.js

var api = {};
api.beers = require('./modules/beers/routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // setando as views
app.set('view engine', 'jade'); // o tipo de view engine

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico')); // favicon
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride(function(req, res){
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
 // look in urlencoded POST bodies and delete it
 var method = req.body._method
 delete req.body._method
 return method
 }
}));

app.use(cookieParser()); // pra trabalhar com cookies
app.use(express.static(path.join(__dirname, 'public'))); // pasta com os arquivos estáticos

app.use(cors()); 
app.use('/', routes); 
app.use('/users', users); 
app.use('/beers', beers); 

// API JSON
app.use('/api/beers', api.beers);

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
