const {Router } = require('express');
const router = Router({mergeParams: true});

const DB_book = require('../../database/adminBookQuery');
const DB_supply = require('../../database/publisherSupplyQuery');

router.get('/', async (req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/login');
    }
    const book_data = await DB_book.getAllBooksByPublisher(req.publisher.name);

    res.render('publisherHome.ejs', {
        items: book_data
    });
})

router.get('/edit/:id', async (req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/login');
    }

    const book_data = await DB_book.getAllInfoById(req.params.id);

    res.render('publisherEditBook.ejs', {
        id: book_data[0].ID,
        title: book_data[0].TITLE,
        writer: book_data[0].NAME,
        publisher: book_data[0].PUBLISHER,
        date_published: book_data[0].DATE_PUBLISHED,
        genre: book_data[0].GENRE,
        stock: book_data[0].QUANTITY_IN_STOCK,
        price: book_data[0].PRICE,
        language: book_data[0].LANGUAGE,
        page: book_data[0].PAGE,
        errors : []
    })
})

router.post('/edit/:id', async (req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/login');
    }
    console.log(req.body);
    const message = await DB_book.editBook(req.params.id, req.body.title, req.body.writer_name, req.body.publisher, req.body.publish_date, req.body.genre, req.body.in_stock, req.body.price, req.body.language, req.body.page );
    console.log(message);
    if(message !== 'OKAY') {
        res.render('publisherEditBook.ejs', {
            id: req.params.id,
            title: req.body.title,
            writer: req.body.writer_name,
            publisher: req.body.publisher,
            date_published: req.body.publish_date,
            genre: req.body.genre,
            stock: req.body.in_stock,
            price: req.body.price,
            language: req.body.language,
            page: req.body.page,
            errors : message.split(', ')
        })
    }
    else {
        res.redirect('/publisher/book');
    }
})

router.get('/add', (req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/login');
    }
    res.render('publisherAddBook.ejs');
})

router.post('/add', async (req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/login');
    }
    const message = await DB_book.insertBook(req.body.title, req.body.writer_name, req.body.publisher, req.body.publish_date, req.body.genre, req.body.in_stock, req.body.price, req.body.language, req.body.page);
    console.log(message);
    if(message !== 'OKAY') {
        res.render('publisherAddBook.ejs', {
            form: {
                id: req.params.id,
                title: req.body.title,
                writer: req.body.writer_name,
                publisher: req.body.publisher,
                date_published: req.body.publish_date,
                genre: req.body.genre,
                stock: req.body.in_stock,
                price: req.body.price,
                language: req.body.language,
                page: req.body.page,
            },            
            errors : message.split(', ')
        }
        )
    }
    else {
        res.redirect('/publisher/book');
    }
})

router.get('/delete/:id', async (req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/login');
    }
    await DB_book.deleteBook(req.params.id);
    res.redirect('/publisher/book');
})

router.post('/supply/add/:id', async (req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/login');
    }
    const result = await DB_supply.addToSupply(req.publisher.name, req.params.id);
    console.log(result);
    res.send('supply');
})

router.get('/supplies', async (req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/login');
    }
    const result = await DB_supply.getAllSupplies(req.publisher.name);
    console.log(result);
    res.render('publisherSupply.ejs', {
        items: result
    });
})

router.get('/supplies/:id', async (req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/login');
    }
    const result = await DB_supply.getSupplyAllData(req.params.id);
    console.log(result);
    res.render('publisherSupplyDetails.ejs', {
        items: result
    });
})

router.post('/supply/:id', async (req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/login');
    }
    await DB_supply.sendSupply(req.params.id);
})

router.post('/supply/update/:ID', async (req, res) => {
    if(req.publisher == null) {
        res.redirect('/publisher/login');
    }
    console.log(req.params.ID);
    console.log(req.body);
    const items = JSON.parse(req.body.items);
    console.log(items);
    for(let i = 0; i < items.length; i++) {
        console.log(req.params.ID, items[i].ID, items[i].PRICE, items[i].QUANTITY);
        await DB_supply.updateSupplyData(req.params.ID, items[i].ID, items[i].PRICE, items[i].QUANTITY);
    }
}) 


module.exports = router;