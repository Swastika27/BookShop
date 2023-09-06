const {Router} = require('express');
const bcrypt = require('bcrypt');
const authUtils = require('../../../utils/authUtils');
const DB_admin = require('../../../database/adminAuthQuery');

const router = Router({mergeParams: true});

router.get('/', (req, res) => {
    if(req.admin == null) {
        return res.render('adminLogin.ejs', {
            title: 'Admin-login',
            user: null,
            form: {
                email: '', 
                password: ''
            },
            errors: []
        })
    }
    else {
        res.redirect('/admin');
    }
});

router.post('/', async (req, res)=> {
    if(req.admin == null) {
        let data = [];
        let error = [];

        data = await DB_admin.getInfoFromEmail(req.body.email);

        console.log('data ', data);
        if(data.length == 0) {
            error.push('admin not found');
        }
        else {
            const isSamePassword = await bcrypt.compare(req.body.password, data[0].PASSWORD);

            if(isSamePassword) {
                await authUtils.loginAdmin(res, 227);
            }
            else {
                error.push('Incorrect Credendials');
            }
        }

        if(error.length == 0) {
            res.redirect('/admin')
        }
        else {
            res.render('adminLogin.ejs', {
                title: 'admin-login',
                errors: error,
                form: {
                    email: req.body.email,
                    password: req.body.password
                }
            });
        }
    } 
    else {
        res.redirect('/admin');
    }
});

module.exports = router;