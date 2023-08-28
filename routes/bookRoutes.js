const {Router} = require('express');
const books = require('../database/bookQuery');
const router = Router();

router.get('/', async (req, res) => {
    const all_books = await books.getAllBooks();
    res.render('all_books', {
        books: all_books
    });
});

router.get('/:id', async (req, res) => {
    const book_data = await books.getBookById(req.params.id);

    res.render('single_book', {
        books: book_data
    });
});

module.exports = router;