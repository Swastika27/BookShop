const jwt = require('jsonwebtoken');

const DB_auth = require('../database/customerAuthQuery');

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

module.exports = {
    auth
}