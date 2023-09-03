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
    const book_id = req.params.id;
    const book_data = await books.getBookById(book_id);
    // const genre_books = await books.getBooksByGenre(genre.GENRE);
    const genre_books = await books.getSameGenreBooks(book_id);
    console.log(genre_books);
    // const writer = (await books.getAuthorId(book_id))[0];
    const writer_books = await books.getSameAuthorDiffGenreBooks(book_id);
    console.log(writer_books)

    res.render('single_book', {
        books: book_data,
        genreBooks: genre_books,
        writerBooks: writer_books
    });
});

module.exports = router;