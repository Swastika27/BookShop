const { Router } = require('express');

const router = Router({mergeParams: true});

const DB_book = require('../../database/bookQuery');

const adminAuth = require('../../middlewares/user_auth').adminAuth;

const loginRouter = require('./authentication/login');
router.use('/login', loginRouter);
const orderRouter = require('../admin/adminOrder');

router.use(adminAuth);

const logoutRouter = require('./authentication/logout');

router.get('/', require('./adminHome'));

router.use('/logout', logoutRouter);
router.use('/order', orderRouter);

module.exports = router;