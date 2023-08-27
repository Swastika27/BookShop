const express = require('express');
const bcypt = require('bcrypt');

const Db_auth = require('../../database/customerAuthQuery');
const authUtils = require('../../utils/authUtils');
const { route } = require('./signup');
const e = require('express');

const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {
    if(req.user == null) { // not logged in
        return res.render('login', {
            title: 'Login',
            user: null,
            form: {
                email: '',
                password: ''
            },
            errors: []
        });
    }
    else { // logged in
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    if(req.user == null) {
        let data = [];
        let error = [];

        data = await Db_auth.getLoginInfoFromEmail(req.body.email);

        if(data.length == 0) {
            error.push('User not found');
        }
        else {
            const isSamePassword = await bcypt.compare(req.body.password, data[0].PASSWORD);

            if(isSamePassword) {
                await authUtils.loginUser(res, data[0].ID);
            }
            else {
                error.push('Incorrect credentials');
            }
        }

        if(error.length == 0) { // no error
            res.redirect('/');
        }
        else {
            res.render('login', {
                title: 'Login',
                user: null,
                error: [],
                form: {
                    email: req.body.email,
                    password: req.body.password
                }
            });
        }
    }
    else { // already logged in
        res.redirect('/');
    }
});

module.exports = router;