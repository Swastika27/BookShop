const {Router} = require('express');

const router = Router({mergeParams: true});

router.post('/', async (req, res) => {
    res.clearCookie('sessionToken');
    res.redirect('/');
});

module.exports = router;