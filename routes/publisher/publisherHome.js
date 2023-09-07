const {Router} = require('express');
const Db_publisher = require('../../database/publisherQuery');

const router = Router({mergeParams: true});

router.get('/', async (req, res) => {
    if(req.publisher == null) {
        return res.redirect('/publisher/login');
    }

    res.render('publisherHome.ejs', {
        title: 'Home'
    });
})

module.exports = router;