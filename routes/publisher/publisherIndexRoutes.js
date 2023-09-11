const {Router} = require('express');
const router = Router({mergeParams: true});

const publisherAuth = require('../../middlewares/user_auth').publisherAuth;

const loginRouter = require('./authentication/login');
const logoutRouter = require('./authentication/logout');
const bookRouter = require('./publisherBook');
const writerRouter = require('./publisherWriter');

router.use(publisherAuth);

router.use('/login', loginRouter);
router.get('/', require('./publisherBook'));


router.use('/logout', logoutRouter);
router.use('/book', bookRouter);
router.use('/writer', writerRouter);


module.exports = router;