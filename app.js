var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');//enviar rutas por put y delete
//instalar con npm i method-override --save
var session = require('express-session'); //instalar
var recordameMiddleware = require('./middleware/recordameMiddleware')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var logMiddleware = require('./middleware/logMiddleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logMiddleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); //enviar rutas por put y delete
app.use(session({secret:'clave secreta'}));
app.use(recordameMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.use((req, res)=>{
  res.status(404).render('not-found')
})

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
