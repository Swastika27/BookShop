const OracleDB = require('oracledb');
const database = require('./database');

async function getAllBookInfo() {
    const query = `SELECT * 
                    FROM BOOK JOIN WRITER 
                    ON BOOK.WRITER_ID = WRITER.ID
                    order by book.id`;
    const binds = {};
    return (await database.execute(query, binds, database.options)).rows;
}

async function getAllInfoById(id) {
    const query = `SELECT * 
                    FROM BOOK JOIN WRITER
                    ON BOOK.WRITER_ID = WRITER.ID 
                    WHERE book.ID = :ID`;
    const binds = {
        id
    }
    return (await database.execute(query, binds, database.options)).rows;       
} 

async function editBook(id, title, writer_name, publisher, year_published, genre, qty_in_stock,  price, lang, page) {
    const query = `BEGIN
                    :output := UPDATEBOOKDATA(:ID, :TITLE, :WRITER_NAME, :PUBLISHER, :YEAR_PUBLISHED, :GENRE, :QTY_IN_STOCK,  :PRICE, :LANG, :PAGE);
                    END;`
    const binds = {
        output: {
            dir: OracleDB.BIND_OUT,
            type: OracleDB.STRING
        },
        id,
        title,
        writer_name,
        publisher,
        year_published: Number(year_published),
        genre, 
        qty_in_stock: Number(qty_in_stock),
        price: Number(price),
        lang,
        page: Number(page)
    }
    const result = await database.execute(query, binds, database.options);
    console.log('Output: ', result.outBinds.output);
    return result.outBinds.output;
}

async function insertBook(title, writer_name, publisher, year_published, genre, qty_in_stock,  price, lang, page) {
    const query = `BEGIN 
                    :OUTPUT := INSERT_BOOK(:title, :writer_name, :publisher, :year_published, :genre, :qty_in_stock, :price, :lang, :page);
                    END;`
    const binds = {
        output: {
            dir: OracleDB.BIND_OUT,
            type: OracleDB.STRING
        },
        title,
        writer_name,
        publisher,
        year_published: Number(year_published),
        genre, 
        qty_in_stock: Number(qty_in_stock),
        price: Number(price),
        lang,
        page: Number(page)
    }
    const result = await database.execute(query, binds, database.options);
    console.log('Output: ', result.outBinds.output);
    return result.outBinds.output;
}

async function getAllBooksByPublisher(name) {
    const query = `SELECT * 
                    FROM BOOK JOIN WRITER 
                    ON BOOK.WRITER_ID = WRITER.ID
                    where publisher = :name`;
    const binds = {
        name
    };
    return (await database.execute(query, binds, database.options)).rows;
}

async function deleteBook(id) {
    const query = `DELETE FROM BOOK 
                    WHERE ID = :ID`;
    const binds = {
        id
    }
    try {
        await database.execute(query, binds, database.options);
    } catch(err) {
        console.log(err.Error.errorNum);
    }
    
}

module.exports = {
    getAllBookInfo,
    getAllInfoById,
    editBook,
    insertBook,
    deleteBook,
    getAllBooksByPublisher
}