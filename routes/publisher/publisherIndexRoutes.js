const {Router} = require('express');
const router = Router({mergeParams: true});

const publisherAuth = require('../../middlewares/user_auth').publisherAuth;

const loginRouter = require('./authentication/login');
const logoutRouter = require('./authentication/logout');

router.use(publisherAuth);

router.use('/login', loginRouter);
router.use('/logout', logoutRouter);

router.get('/', require('./publisherHome'));

module.exports = router;