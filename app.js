const express = require('express');
const morgan = require('morgan');

const indexRouter = require('./routes/indexRoutes');

const app = express();

app.use(morgan('dev'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', indexRouter);

module.exports = app;