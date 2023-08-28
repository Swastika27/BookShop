const {Router} = require('express');

const router = Router();

router.get('/', async (req, res) => {
    console.log('signup page get');
    res.render('signup');
});

module.exports = router;