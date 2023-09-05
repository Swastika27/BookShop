
const { isAlreadyAdded } = require('./cartQuery');
const database = require('./database');

async function getAllBooks(user_id) {
    const query = `SELECT BOOK.ID AS ID, TITLE, GENRE, NAME AS WRITER_NAME
                    FROM BOOK
                    JOIN WRITER 
                    ON (BOOK.WRITER_ID = WRITER.ID)
                    WHERE BOOK.ID IN (
                        SELECT BOOK_ID
                        FROM WISHLISTS
                        WHERE CUSTOMER_ID = :id
                    )`;
    const binds = {
        id: user_id
    }

    return (await database.execute(query, binds, database.options)).rows;

}

async function isAddedToWishlist(user_id, book_id) {
    const query = `SELECT BOOK_ID 
                    FROM WISHLISTS
                    WHERE CUSTOMER_ID = :c_id AND BOOK_ID = :b_id`;
    const binds = {
        c_id: user_id,
        b_id: book_id
    } 
    return (await database.execute(query, binds, database.options)).rows;
           
}
async function addToWishlist(user_id, book_id) {
    const isAlreadyAdded = isAddedToWishlist(user_id, book_id);
    if(isAlreadyAdded.length > 0) {
        console.log('already added');
        return null;
    }
    else {
        const query = `INSERT INTO WISHLISTS VALUES(:c_id, :b_id)`;
        const binds = {
            c_id: user_id,
            b_id: book_id
        }
        return (await database.execute(query, binds, database.options)).rows;

    }
}

async function deleteFromWishlist(user_id, book_id) {
    const query = `DELETE FROM WISHLISTS 
                    WHERE CUSTOMER_ID = :c_id 
                    AND BOOK_ID = b_id`;
    const binds = {
        c_id: user_id,
        b_id: book_id
    }
    return (await database.execute(query, binds, database.options)).rows;

}

module.exports = {
    getAllBooks,
    addToWishlist,
    deleteFromWishlist
}