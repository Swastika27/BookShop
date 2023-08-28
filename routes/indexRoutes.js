const {Router} = require('express');
const router = Router();

const bookQuery = require('../database/bookQuery')

const book_router = require('./bookRoutes');
const writer_router = require('./authorRoutes');
const publisher_router = require('./publisherRoutes');
const login_router = require('./loginRoutes');
const signup_router = require('./signupRoutes');
const homepage_router = require('./homepageRoutes');

router.get('/', async(req, res) => {
    const all_books = await bookQuery.getAllBooks();
    res.render('index.ejs', {
        books: all_books
    });
    res.render('index');
});

router.use('/books', book_router);
router.use('/writers', writer_router);
router.use('/publishers', publisher_router);
router.use('/login', login_router);
router.use('/signup', signup_router);
router.use('/homepage', homepage_router);

module.exports = router;

