const { Router } = require('express');
const router = Router();

const bookQuery = require('../database/bookQuery');

router.post('/', async (req, res) => {
    console.log(req.body);
    const search_result = await bookQuery.getBooksByText(req.body.search_text);
    // const all_books = await bookQuery.getAllBooks();
    const all_genre = await bookQuery.getAllGenre();
    const all_authors = await bookQuery.getAllAuthors();

    // console.log(all_genre);
    
    return res.render('index.ejs', {
        books: search_result,
        genres: all_genre,
        authors: all_authors
    });
    
});

module.exports = router;

