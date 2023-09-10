const {Router} = require('express');

const router = Router({mergeParams: true});

router.get('/', async (req, res) => {
    if(req.admin !== null) {
        res.clearCookie('publisherSessionToken');
        res.redirect('/publisher/login');
    }
})

module.exports = router;