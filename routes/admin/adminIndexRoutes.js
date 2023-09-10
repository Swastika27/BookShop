const { Router } = require('express');

const router = Router({mergeParams: true});

const DB_book = require('../../database/bookQuery');

const adminAuth = require('../../middlewares/user_auth').adminAuth;

const loginRouter = require('./authentication/login');
router.use('/login', loginRouter);
const orderRouter = require('../admin/adminOrder');
const publisherRouter = require('../admin/adminPublisher');
const bookRouter = require('../admin/adminBook');
const supplyRouter = require('../admin/adminSupply');

router.use(adminAuth);

const logoutRouter = require('./authentication/logout');

router.get('/', require('./adminHome'));

router.use('/logout', logoutRouter);
router.use('/order', orderRouter);
router.use('/publisher', publisherRouter);
router.use('/book', bookRouter);
router.use('/supplies', supplyRouter);

module.exports = router;