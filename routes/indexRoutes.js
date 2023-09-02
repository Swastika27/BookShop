const {Router} = require('express');
const router = Router();

const bookQuery = require('../database/bookQuery')

const book_router = require('./bookRoutes');
const writer_router = require('./authorRoutes');
const publisher_router = require('./publisherRoutes');
// const login_router = require('./loginRoutes');
// const signup_router = require('./signupRoutes');
const homepage_router = require('./homepageRoutes');

const signup_router = require('./authentication/signup');
const login_router = require('./authentication/login');
const logout_router = require('./authentication/logout');

const cart_router = require('./cartRoutes');

const search_router = require('./searchRoutes');
const filter_router = require('./filterRoutes');

router.get('/', async(req, res) => {
    const all_books = await bookQuery.getAllBooks();
    const all_genre = await bookQuery.getAllGenre();
    const all_authors = await bookQuery.getAllAuthors();

    console.log(all_genre);
    
    res.render('index.ejs', {
        books: all_books,
        genres: all_genre,
        authors: all_authors
    });
    res.render('index');
});

router.get('/homepage', async(req, res) => {
    const all_books = await bookQuery.getAllBooks();
    res.render('homepage.ejs', {
        books: all_books
    });
})

router.use('/books', book_router);
router.use('/writers', writer_router);
router.use('/publishers', publisher_router);
router.use('/login', login_router);
router.use('/signup', signup_router);
router.use('/homepage', homepage_router);

router.use('/signup', signup_router);
router.use('/login', login_router);
router.use('/logout', logout_router);

router.use('/search', search_router);
router.use('/filter', filter_router);

router.use('/cart', cart_router);

module.exports = router;

