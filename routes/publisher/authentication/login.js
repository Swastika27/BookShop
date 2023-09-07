const {Router} = require('express');
const bcrypt = require('bcrypt');
const authUtils = require('../../../utils/authUtils');
const DB_publisher = require('../../../database/publisherAuthQuery');

const router = Router({mergeParams: true});

router.get('/', (req, res) => {
    if(req.publisher == null) {
        console.log('i publisher null');
        // console.log(req);
        return res.render('publisherLogin.ejs', {
            title: 'Publisher-login',
            user: null,
            form: {
                email: '', 
                password: ''
            },
            errors: []
        })
    }
    else {
        res.redirect('/publisher');
    }
});

router.post('/', async (req, res)=> {
    if(req.publisher == null) {
        let data = [];
        let error = [];

        data = await DB_publisher.getInfoFromEmail(req.body.email);

        console.log('data ', data);
        if(data.length == 0) {
            error.push('publisher not found');
        }
        else {
            const isSamePassword = await bcrypt.compare(req.body.password, data[0].PASSWORD);
            console.log(req.body.password);
            console.log(isSamePassword);
            if(isSamePassword) {
                await authUtils.loginPublisher(res, data[0].EMAIL);
                console.log('publisher logged in');
            }
            else {
                error.push('Incorrect Credendials');
            }
        }

        if(error.length == 0) {
            res.redirect('/publisher')
        }
        else {
            res.render('publisherLogin.ejs', {
                title: 'publisher-login',
                errors: error,
                form: {
                    email: req.body.email,
                    password: req.body.password
                }
            });
        }
    } 
    else {
        res.redirect('/publisher');
    }
});

module.exports = router;