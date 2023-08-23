const {Router} = require('express');
const publisher = require('../database/publisherQuery');
const book = require('../database/bookQuery');
const router = Router();

router.get('/', async (req, res) => {
    const publishers = await publisher.getAllPublishers();
    res.render('all_publishers', {
        publishers
    });
});

router.get('/:name', async (req, res) => {
    console.log('specific publisher');
    const publisher_data = await publisher.getPublisherByName(req.params.name);
    const publisher_book_data = await book.getBooksByPublisher(req.params.name);
    res.render('single_publisher', {
        publishers: publisher_data,
        books: publisher_book_data
    });
});

module.exports = router;