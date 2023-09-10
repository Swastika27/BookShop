const {Router } = require('express');
const router = Router({mergeParams: true});

const DB_book = require('../../database/adminBookQuery');

router.get('/', async (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    const book_data = await DB_book.getAllBookInfo();

    res.render('adminBooks.ejs', {
        items: book_data
    });
})

router.get('/edit/:id', async (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }

    const book_data = await DB_book.getAllInfoById(req.params.id);

    res.render('adminEditBook.ejs', {
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
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    console.log(req.body);
    const message = await DB_book.editBook(req.params.id, req.body.title, req.body.writer_name, req.body.publisher, req.body.publish_date, req.body.genre, req.body.in_stock, req.body.price, req.body.language, req.body.page );
    console.log(message);
    if(message !== 'OKAY') {
        res.render('adminEditBook.ejs', {
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
        res.redirect('/admin/book');
    }
})

router.get('/add', (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    res.render('adminAddBook.ejs');
})

router.post('/add', async (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    const message = await DB_book.insertBook(req.body.title, req.body.writer_name, req.body.publisher, req.body.publish_date, req.body.genre, req.body.in_stock, req.body.price, req.body.language, req.body.page);
    console.log(message);
    if(message !== 'OKAY') {
        res.render('adminAddBook.ejs', {
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
        res.redirect('/admin/book');
    }
})

router.get('/delete/:id', async (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    await DB_book.deleteBook(req.params.id);
    res.redirect('/admin/book');
})

module.exports = router;