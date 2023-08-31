const { Router } = require('express');
const router = Router();

const bookQuery = require('../database/bookQuery');

router.post('/genre', async(req, res) => {
    console.log('filter route', req.body);

    const result = await bookQuery.getBooksByGenreFilter(req.body);

    res.json({ result });
})

router.post ('/author', async (req, res) => {
    console.log('author filter route', req.body);

    const result = await bookQuery.getBooksByAuthorFilter(req.body);

    res.json({ result });
})

module.exports = router;
