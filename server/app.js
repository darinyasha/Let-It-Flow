require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const app = express();

//* Импорт роутов
const indexRouter = require('./routes/index.routes');
const usersRouter = require('./routes/users.routes');
const regRouter = require('./routes/reg.routes');
const loginRouter = require('./routes/login.routes');
const logoutRouter = require('./routes/logout.routes');
const cartRouter = require('./routes/cart.routes');

//* config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//* use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', regRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/cart', cartRouter);

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
