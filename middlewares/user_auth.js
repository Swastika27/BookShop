const jwt = require('jsonwebtoken');

const DB_user_login = require('../database/customerAuthQuery');

function auth(req, res, next) {
    req.user = null;
}