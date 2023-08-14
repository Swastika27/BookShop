const oracledb = require('oracledb');
const express = require('express');
const port = 3000;

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const app = express();

app.listen(port);

app.set('view engine', 'ejs');
app.use(express.static('public'));

async function runQuery(query) {
    const connection = await oracledb.getConnection({
        user: "rokomari",
        password: "12345",
        connectionString: "localhost/ORCLPDB"
    });

    const result = await connection.execute(query);

    await connection.close();

    return result;
}

app.get('/', async (req, res) => {
    const data = await runQuery(`Select Book.TITLE, Book.ID, Book.PUBLISHER, Writer.name As WRITER_NAME from Book, Writer where (Book.Writer_id = Writer.id)`);
    const books = data.rows;
    // books.forEach(book => {
    //     console.log(book.TITLE);
    //     console.log(book.AUTHOR);
    // })
    res.render('index', {books: books});
})

app.get('/all_writers', async(req, res) => {
    const writer_data = await runQuery(`SELECT NAME, ID FROM WRITER ORDER BY NAME`);
    const writers = writer_data.rows;

    res.render('all_writers', {writers : writers});
});

app.get('/all_publishers', async(req, res) => {
    const data = await runQuery(`SELECT NAME FROM PUBLISHER ORDER BY NAME`);
    const publishers = data.rows;
    res.render('all_publishers', {publishers});
});

app.get('/all_books/:id', async (req, res) => {
    const id = req.params.id;

    const data = await runQuery(`SELECT Book.title, Book.GENRE, BOOK.QUANTITY_IN_STOCK,Book.Publisher, BOOK.PRICE, BOOK.DATE_PUBLISHED, Book.PAGE, WRITER.NAME AS WRITER_NAME FROM BOOK , WRITER
    WHERE (BOOK.id = ${id}) AND (BOOK.WRITER_ID = WRITER.id )`)

    res.render('single_book', { books: data.rows});
});

app.get('/all_writers/:id', async(req, res) => {
    console.log(req.params);
    const id = req.params.id;
    const writer_data = await runQuery(`SELECT * FROM WRITER WHERE id = ${id}`);
    const book_data = await runQuery(`Select Book.TITLE, Book.ID, Book.PUBLISHER, Writer.name As WRITER_NAME from Book, Writer where (Book.Writer_id = Writer.id) AND (Book.Writer_id = ${id})`);

    res.render('single_writer', {writers: writer_data.rows, books: book_data.rows});
});

app.get('/all_publishers/:id', async(req, res) => {
    const id = req.params.id;
    const publisher_data = await runQuery(`Select * from publisher where name = '${id}'`);
    const book_data = await runQuery(`Select Book.TITLE, Book.ID, Book.PUBLISHER, Writer.name As WRITER_NAME from Book, Writer where (Book.Writer_id = Writer.id) AND (Book.PUBLISHER = '${id}')`);

    res.render('single_publisher', {publishers: publisher_data.rows, books: book_data.rows});
});