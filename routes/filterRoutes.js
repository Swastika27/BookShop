const { Router } = require('express');
const router = Router();

const bookQuery = require('../database/bookQuery');

router.post('/all', async (req, res) => {
    console.log(req.body);
    // res.send({status: 'ok'});

    const result = await bookQuery.getBooksByFilter(req.body.sort_type, req.body.genreText, req.body.writerText);
    res.json({result});
})

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
