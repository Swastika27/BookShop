const { Router } = require('express');
const router = Router({mergeParams: true});

const DB_writer = require('../../database/writerQuery');

router.get('/', async (req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/writer');
    }
    else {
        const writer_data = await DB_writer.getAllWriterInfoByPublisher(req.publisher.name);
        console.log(writer_data);
        res.render('publisherWriter.ejs', {
            items: writer_data
        })
    }
})

router.get('/add', async(req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/writer');
    }
    else {
        res.render('publisherAddWriter.ejs');
    }
})

module.exports = router;