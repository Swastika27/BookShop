const { Router } = require('express');
const router = Router();

const bookQuery = require('../database/bookQuery');

router.post('/', async (req, res) => {
    console.log(req.body);
    const search_result = await bookQuery.getBooksByText(req.body.search_text);
    // if(search_result) {
    //     console.log("result ", search_result);
    // }
    return res.render('search_result.ejs', {
        books: search_result
    })
});

module.exports = router;

