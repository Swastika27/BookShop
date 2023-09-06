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

async function loginAdmin(res, user_id) {
    const payLoad = {
        superId: user_id
    };
    let token = jwt.sign(payLoad, process.env.APP_SECRET);
    let options = {
        httpOnly: true
    }
    res.cookie('adminSessionToken', token, options);
}

async function loginPublisher(res, user_email) {
    const payLoad = {
        email: user_email
    };
    let token = jwt.sign(payLoad, process.env.APP_SECRET);
    let options = {
        httpOnly: true
    }
    res.cookie('publisherSessionToken', token, options);
} 

module.exports = {
    loginUser,
    loginAdmin,
    loginPublisher
};