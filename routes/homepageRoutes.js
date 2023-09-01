const {Router} = require('express');
const book = require('../database/bookQuery')

const router = Router();

// const index_router = require('./indexRoutes');

router.get('/', async (req, res) => {
    console.log('homepage page get');
    res.render('homepage');
});


// router.use('/index', index_router);

module.exports = router;