const express = require('express');
const bcrypt = require('bcrypt');

const Db_auth = require('../../database/customerAuthQuery');
const authUtils = require('../../utils/authUtils');

const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {
    if(req.user == null) { // if not logged in, take to signup page
        res.render('signup', {
            title: 'signup',
            user: null,
            errors: []
        });

    }
    else {
        console.log('user logged in');
        res.redirect('/'); // if already logged in, redirect to home page
    }
});

router.post('/', async (req, res) => {
    if(req.user == null) { // not logged in
        let results, errors = [];

        console.log('email from body ' + req.body.email);
        results = await Db_auth.getUserIdFromEmail(req.body.email);
        console.log('result from database ',results);

        if(results.length > 0) {
            errors.push('Email is already registered');
        }

        // if(req.body.password !== req.body.password2) {
        //     errors.push('Passwords don\'t match');
        // }

        if(req.body.password.length < 6) {
            errors.push('Password must contain at least 6 characters');
        } 

        console.log(req.body.name, req.body.password);

        if(errors.length > 0) {
            res.render('signup', {
                title: 'signup',
                user: null,
                errors: errors,
                form: {
                    name: req.body.name,
                    email: req.body.password,
                    // password2: req.body.password2
                }
            });
            // res.send({
            //         title: 'signup',
            //         user: null,
            //         errors: errors,
            //         form: {
            //             name: req.body.name,
            //             email: req.body.password,
            //             // password2: req.body.password2
            //         }});
        }

        else { // no errors
            console.log('no errors');
            let user = {
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            }
            console.log(
                'created user object'
            )
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(user.password, salt);
            console.log('no error hashing');
            user.password = hashedPassword;
            let result = await Db_auth.createNewCustomer(user);
            console.log(user);
            console.log('goin to find new user');
            let result2 = await Db_auth.getLoginInfoFromEmail(user.email);
            console.log('new user found ', result2);
            await authUtils.loginUser(res, result2[0].ID);
            // redirect to home page
            console.log('redirect to home page');
            res.redirect('/homepage')
            // res.send({
            //     user: result2[0].ID,
            //     errors: []
            // });
        }
    }
    else {
        res.redirect('/homepage');
        // res.send({
        //     user: result2[0].ID,
        //     errors: []
        // });
    }
});

module.exports = router;


