const {Router} = require('express');
const Db_publisher = require('../../database/publisherQuery');

const router = Router({mergeParams: true});

router.get('/', async (req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/login');
    }
    const book_data = await DB_book.getAllBooksByPublisher(req.publisher.name);

    res.render('publisherHome.ejs', {
        items: book_data
    });
})


module.exports = router;