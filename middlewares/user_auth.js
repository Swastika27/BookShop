const jwt = require('jsonwebtoken');

const DB_auth = require('../database/customerAuthQuery');
const DB_auth_publisher = require('../database/publisherAuthQuery');

function auth(req, res, next){
    req.user = null;
    // check if user has cookie token
    if(req.cookies.sessionToken){
        let token = req.cookies.sessionToken;
        // verify token was made by server
        jwt.verify(token, process.env.APP_SECRET, async (err, decoded) =>{
            if(err){
                console.log("ERROR at verifying token: " + err.message);
                next();
            } else {
                // get user prompt (id, handle, message count) from id
                const decodedId = decoded.id;
                let results = await DB_auth.getLoginInfoFromId(decodedId);

                // if no such user or token doesn't match, do nothing
               if(results.length == 0){
                    console.log('auth: invalid cookie');
                }
                else{
                    let time = new Date();

                    req.user = {
                        id: decodedId,
                        EMAIL: results[0].EMAIL,
                        NAME: results[0].NAME,
                        IMAGE:results[0].IMAGE
                    }
                }
                next();
            }
        });
    } else {
        next();
    }   
}

function adminAuth(req, res, next) {
    req.admin = null;

    if(req.cookies.adminSessionToken) {
        let token = req.cookies.adminSessionToken;
        jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
            if(err) {
                console.log("error at verifying token: ", err);
                next();
            } else {
                const decodedId = decoded.superId;

                if(decodedId !== 227) {
                    console.log('error admin');
                } 
                else {
                    req.admin = {
                        NAME: 'ADMIN'
                    }
                }
                next();
            }
        })
    } else {
        next();
    }
}

function publisherAuth(req, res, next) {
    req.publisher = null;
    if(req.cookies.publisherSessionToken) {
        let token = req.cookies.publisherSessionToken;

        jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
            if(err) {
                console.log('Error publisher');
                next();
            } else {
                const decodedId = decoded.email; // publisher email

                let results = await DB_auth_publisher.getInfoFromEmail(decodedId);
                console.log(results);

                if(results.length == 0) {
                    next();
                }
                else {
                    req.publisher = {
                        name: results[0].NAME,
                        email: results[0].EMAIL
                    }
                }
                next();
            }
        })
    } else {
        next();
    }
}

module.exports = {
    auth,
    adminAuth,
    publisherAuth
}