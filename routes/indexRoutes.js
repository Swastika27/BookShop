const {Router} = require('express');
const router = Router();

const bookQuery = require('../database/bookQuery')

const book_router = require('./bookRoutes');
const writer_router = require('./authorRoutes');
const publisher_router = require('./publisherRoutes');
const login_router = require('./authentication/login');
const logout_router = require('./authentication/logout');
const signup_router = require('./authentication/signup');
const homepage_router = require('./homepageRoutes');

const cart_router = require('./cartRoutes');
const wishlist_router = require('./wishListRoutes');
const rating_router = require("./ratingRoutes");

const search_router = require('./searchRoutes');
const filter_router = require('./filterRoutes');

router.get('/', async(req, res) => {
    const all_books = await bookQuery.getAllBooks();
    const all_genre = await bookQuery.getAllGenre();
    const all_authors = await bookQuery.getAllAuthors();

    // console.log(all_genre);
    
    res.render('index.ejs', {
        books: all_books,
        genres: all_genre,
        authors: all_authors
    });
});

router.get('/homepage', async(req, res) => {
    const all_books = await bookQuery.getAllBooks();
    const all_genre = await bookQuery.getAllGenre();
    const all_authors = await bookQuery.getAllAuthors();
    const recc = await bookQuery.getRecommendation(req.user.id);
    // console.log(recc);
    const difference = all_books.filter(item => !recc.includes(item));
    const final_list = recc.concat(difference);
    // console.log(final_list);
    res.render('homepage.ejs', {
        books: final_list,
        genres: all_genre,
        authors: all_authors
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
router.use('/wishlist', wishlist_router);
router.use('/rating', rating_router);

module.exports = router;

