const {Router} = require('express');

const router = Router({mergeParams: true});

router.get('/', async (req, res) => {
    if(req.admin !== null) {
        res.clearCookie('adminSessionToken');
        res.redirect('/admin/login');
    }
})

module.exports = router;