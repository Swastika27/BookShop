const {Router} = require('express');
const router = Router();

const bookQuery = require('../database/bookQuery')

const book_router = require('./bookRoutes');
const writer_router = require('./authorRoutes');
const publisher_router = require('./publisherRoutes');

router.get('/', async(req, res) => {
    const all_books = await bookQuery.getAllBooks();
    res.render('index.ejs', {
        books: all_books
    });
});

router.use('/books', book_router);
router.use('/writers', writer_router);
router.use('/publishers', publisher_router);

module.exports = router;

