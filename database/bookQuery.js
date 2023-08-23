const database = require('./database');

async function getAllBooks() {
    const query = `Select * From Book order by title`;
    const binds = {};
    return (await database.execute(query, binds, database.options)).rows;
}

async function getBookById(id) {
    const query = `SELECT Book.title, Book.GENRE, BOOK.QUANTITY_IN_STOCK,Book.Publisher, BOOK.PRICE, BOOK.DATE_PUBLISHED, Book.PAGE, WRITER.NAME AS WRITER_NAME FROM BOOK , WRITER
    WHERE (BOOK.id = :id) AND (BOOK.WRITER_ID = WRITER.id )`;
    const binds = {
        id
    }
    return (await database.execute(query, binds, database.options)).rows;
}

async function getBooksByAuthorId(id) {
    const query = `Select Book.TITLE, Book.ID, Book.PUBLISHER, Writer.name As WRITER_NAME from Book, Writer where (Book.Writer_id = Writer.id) AND (Book.Writer_id = :id)`;
    const binds = {
        id
    };
    return (await database.execute(query, binds, database.options)).rows;
}

async function getBooksByPublisher(name) {
    const query = `Select Book.TITLE, Book.ID, Book.PUBLISHER, Writer.name As WRITER_NAME from Book, Writer where (Book.Writer_id = Writer.id) AND (Book.PUBLISHER = :NAME)`;
    const binds = {
        NAME: name
    };
    return (await database.execute(query, binds, database.options)).rows;
}


module.exports = {
    getAllBooks,
    getBookById,
    getBooksByAuthorId,
    getBooksByPublisher
}