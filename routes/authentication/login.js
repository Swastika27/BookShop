const express = require('express');
const bcypt = require('bcrypt');

const Db_auth = require('../../database/customerAuthQuery');
const authUtils = require('../../utils/authUtils');
const Db_cart = require('../../database/cartQuery');

const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {
    // console.log(req.query.token);
    if(req.user == null) { // not logged in
        console.log('in login, user not logged in');
        res.render('login', {
            title: 'Login',
            user: null,
            form: {
                email: '',
                password: ''
            },
            errors: []
        });
        // res.render('login', {
        //     title: 'LOGIN',
        //     errors: []
        // });
        // res.send('login page');
    }
    else { // logged in
        res.redirect('/homepage');
    }
});

router.post('/', async (req, res) => {
    if(req.user == null) {
        let data = [];
        let error = [];

        data = await Db_auth.getLoginInfoFromEmail(req.body.email);

        console.log('data', data);
        if(data.length == 0) {
            error.push('User not found');
        }
        else {
            const isSamePassword = await bcypt.compare(req.body.password, data[0].CUSTOMER_PASSWORD);

            if(isSamePassword) {
                await authUtils.loginUser(res, data[0].ID);
                console.log('user logged in');
                const user_carts = await Db_cart.getActiveCart(data[0].ID);
                console.log('cart ', user_carts);
                if(user_carts.length == 0) {
                    await Db_cart.assignNewCart(data[0].ID);
                }
            }

            else {
                error.push('Incorrect credentials');
            }
        }

        if(error.length == 0) { // no error
            res.redirect('/homepage');
        }
        else {
            res.render('login', {
                title: 'Login',
                user: null,
                errors: [],
                form: {
                    email: req.body.email,
                    password: req.body.password
                }
            });
        }
    }
    else { // already logged in
        console.log(req.user);
        res.redirect('/homepage');
    }
});

module.exports = router;