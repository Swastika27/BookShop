const {Router} = require('express');

const router = Router();

router.get('/', async (req, res) => {
    console.log('login page get');
    res.render('login');
});

module.exports = router;