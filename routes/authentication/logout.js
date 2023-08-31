const {Router} = require('express');

const router = Router({mergeParams: true});

router.get('/', async (req, res) => {
    res.clearCookie('sessionToken');
    res.redirect('/');
});

module.exports = router;