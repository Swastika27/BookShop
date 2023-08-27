const express = require('express');
const morgan = require('morgan');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');

const indexRouter = require('./routes/indexRoutes');

const app = express();

app.use(morgan('dev'));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cookie_parser());

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', indexRouter);

module.exports = app;