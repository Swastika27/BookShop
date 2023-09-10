const {Router} = require('express');
const router = Router({mergeParams: true});

const publisherAuth = require('../../middlewares/user_auth').publisherAuth;

const loginRouter = require('./authentication/login');
const logoutRouter = require('./authentication/logout');
const bookRouter = require('./publisherBook');

router.use(publisherAuth);

router.get('/', require('./publisherBook'));

router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/book', bookRouter);


module.exports = router;