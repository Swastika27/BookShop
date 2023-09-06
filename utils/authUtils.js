const jwt = require('jsonwebtoken');

const Db_auth = require('../database/customerAuthQuery');

async function loginUser(res, userID) {
    // create a token
    console.log(userID);
    const payLoad = {
        id: userID
    };

    console.log(process.env.APP_SECRET)

    const token = jwt.sign(payLoad, process.env.APP_SECRET);

    const options = {
        httpOnly: true
    };
    // set token to cookie
    res.cookie('sessionToken', token, options);
}

module.exports = {
    loginUser
};