var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session=require('express-session');


var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//* Nuevo *//

app.use(session({
  secret:'u98mxz4bc00g5hk72nxl',
  resave:false,
  saveUninitialized:true
}));

//* Nuevo *//
app.get('/', function(req, res) {
  var habilitado = Boolean(req.session.nombre);

  res.render('index', {
    title: 'Ejemplo de Sesiones',
    habilitado: habilitado,
    nombre: req.session.nombre,
    apellido:req.session.apellido
  });
});



app.post('/ingresar', function(req, res){
  if(req.body.nombre && req.body.apellido){
    req.session.nombre=req.body.nombre
    req.session.apellido=req.body.apellido
  }
  res.redirect('/');
});

app.get('/salir', function(req,res){
  req.session.destroy();
  res.redirect('/');
});


app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
