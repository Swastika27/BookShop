const {Router} = require('express');
const author = require('../database/authorQuery');
const book = require('../database/bookQuery')

const router = Router();

router.get('/', async (req, res) => {
    const all_authors = await author.getAllAuthors();
    res.render('all_writers', {
        writers: all_authors
    });
});

router.get('/:id', async (req, res) => {
    const writer_data = await author.getAuthorById(req.params.id);
    const writer_book_data = await book.getBooksByAuthorId(req.params.id);
    res.render('single_writer', {
        writers: writer_data,
        books: writer_book_data
    });
});

module.exports = router;