const {Router} = require('express');

const router = Router({mergeParams: true});

router.post('/', async (req, res) => {
    if(req.admin !== null) {
        res.clearCookie('adminSessionToken');
        res.redirect('/admin/login');
    }
})

module.exports = router;