const database = require('./database');

async function getAllBooks() {
    const query = `Select book.id as id, title, publisher, name as writer_name From Book Join writer on (book.writer_id = writer.id) order by title`;
    const binds = {};
    return (await database.execute(query, binds, database.options)).rows;
}

async function getAllGenre() {
    const query = `SELECT DISTINCT GENRE FROM BOOK ORDER BY GENRE`
    const binds = {};
    return (await database.execute(query, binds, database.options)).rows;
}

async function getBookById(id) {
    const query = `SELECT Book.ID, Book.title, Book.GENRE, BOOK.RATING, BOOK.QUANTITY_IN_STOCK,Book.Publisher, BOOK.PRICE, BOOK.DATE_PUBLISHED, Book.PAGE, WRITER.NAME AS WRITER_NAME FROM BOOK , WRITER
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

async function getBooksByText(text) {
    console.log('search text', text);
    const query = `
    SELECT
        Book.TITLE,
        Book.ID,
        Book.PUBLISHER,
        Writer.name AS WRITER_NAME
    FROM
        Book,
        Writer
    WHERE
        (Book.writer_id = writer.id)
        AND (
            (book.title LIKE :TEXT)
            OR (writer.name LIKE :TEXT)
            OR (book.genre LIKE :TEXT)
            OR (book.publisher LIKE :TEXT)
        )
        `;

    const binds = {
        TEXT: `%${text}%`
    };

    return (await database.execute(query, binds, database.options)).rows;
}

async function getBooksByGenreFilter(genres) {
    let condition = `(genre = :g0)`;
    let binds = {
        g0 : genres[0]
    }
    for (let i = 1; i < genres.length; i++) {
        condition = condition + `or (genre = :g${i})`;
        binds[`g${i}`] = genres[i];
    }

    const query = `Select book.id as id, title, publisher, name as writer_name From Book Join writer on (book.writer_id = writer.id) where ` + condition;

    return (await database.execute(query, binds, database.options)).rows;
}
async function getBooksByFilter(sort_type, genres, writers) {
    console.log('a' + '' + '' + '' + 'b');
     let genreCondition = ``;
     let binds = {};
     if (genres.length > 0) {
        genreCondition = genreCondition + `(genre = :g0)`;
        binds[`g0`] = genres[0];
        for (let i = 1; i < genres.length; i++) {
            genreCondition = genreCondition + `or (genre = :g${i})`;
            binds[`g${i}`] = genres[i];
        }
     }

     let writerCondition = ``;
    
     if(writers.length > 0) {
        writerCondition = writerCondition + `(writer.name = :w0)`;
        binds[`w0`] = writers[0];
        for(let i = 1; i < writers.length; i++) {
            writerCondition = writerCondition + ` or (writer.name = :w${i})`;
            binds[`w${i}`] = writers[i];
        }
     }
     let order_by = ``;
     if(sort_type != null) {
        order_by = order_by + 'ORDER BY PRICE ' + sort_type; 
     }

     let condition = ``;
     if(genreCondition !== '') {
        condition = `(${genreCondition})`
     }
     if(condition !== '' && writerCondition != '') {
        condition = condition + ` AND (${writerCondition})`;
     }
     else if (condition == '' && writerCondition != '') {
        condition = condition + ` ${writerCondition}`;
     }

     if(condition !== '') {
        condition = 'WHERE ' + condition;
     }

    condition = condition + ` ${order_by}`;


     console.log(condition);

     const query = `Select book.id as id, title, publisher, name as writer_name 
     From Book 
     Join writer 
     on (book.writer_id = writer.id) ` + condition;

     return (await database.execute(query, binds, database.options)).rows;
}

async function getAllAuthors () {
    const query = `SELECT NAME FROM WRITER ORDER BY NAME`;
    const binds = {};
    return (await database.execute(query, binds, database.options)).rows;
}

async function getBooksByAuthorFilter(authors) {
    let condition = `(writer.name = :w0)`;
    let binds = {
        w0: authors[0]
    };
    for(let i = 1; i < authors.length; i++) {
        condition = condition + ` or (writer.name = :w${i})`;
        binds[`w${i}`] = authors[i];
    }
    const query = `Select book.id as id, title, publisher, name as writer_name 
    From Book 
    Join writer 
    on (book.writer_id = writer.id) 
    where ` + condition;

    return (await database.execute(query, binds, database.options)).rows;
}

async function getBooksByGenre (genre) {
    const query = `Select Book.TITLE, Book.ID, Book.PUBLISHER, Writer.name As WRITER_NAME from Book, Writer where (Book.Writer_id = Writer.id) AND (BOOK.genre LIKE :genre)`;
    const binds = {
        genre: {
            dir: oracledb.BIND_IN, // Specify the direction (BIND_IN for input)
            type: oracledb.STRING, // Specify the data type
            val: genre // The actual value to bind
          }
    };
    return (await database.execute(query, binds, database.options)).rows;
}

async function getAuthorId(book_id) {
    const query = `SELECT WRITER_ID FROM BOOK WHERE (BOOK.ID = :id)`;
    const binds = {
        id: book_id
    }
    return (await database.execute(query, binds, database.options)).rows;
}


async function getSameGenreBooks (book_id) {
    console.log(book_id);
    const query = `select book.id as id, title, publisher, writer.name as writer_name 
    from book 
    join writer on (book.writer_id = writer.id)
    where (book.genre in (select genre from book where id = :id))
    minus 
    (select book.id as id, title, publisher, writer.name as writer_name 
        from book 
        join writer 
        on (book.writer_id = writer.id) 
        where (book.id = :id) )`;
    const binds = {
        id: book_id
    };

    return (await database.execute(query, binds, database.options)).rows;
}

async function getSameAuthorDiffGenreBooks(book_id) {
    const query = `select book.id as id, title, publisher, writer.name as writer_name
     from book join writer 
     on (book.writer_id = writer.id) 
     where (book.writer_id in 
        (select writer_id from book where id = :id) 
        )
        minus 
        (select book.id as id, title, publisher, writer.name as writer_name 
            from book join writer 
            on (book.writer_id = writer.id) 
            where (book.genre in (select genre from book where id = :id) )
            )`;
    const binds = {
        id: book_id
    };

    return (await database.execute(query, binds, database.options)).rows;
}

module.exports = {
    getAllBooks,
    getBookById,
    getBooksByPublisher,
    getBooksByText,
    getAllGenre,
    getBooksByGenreFilter,
    getAllAuthors,
    getBooksByAuthorFilter,
    getSameGenreBooks,
    getSameAuthorDiffGenreBooks,
    getBooksByFilter
}