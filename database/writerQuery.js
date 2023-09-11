const OracleDB = require('oracledb');

const database = require('./database');

async function getAllWriterInfoByPublisher(p_name) {
    const query = `SELECT WRITER.ID, NAME, count(BOOK.ID) AS TOTAL_BOOK, SUM(C.QUANTITY) AS TOTAL_SOLD 
    FROM WRITER
    JOIN BOOK ON WRITER.ID = BOOK.WRITER_ID
    JOIN (
        SELECT B.WRITER_ID, ci.BOOK_ID, ci.quantity
        FROM ORDERS O
        JOIN CARTITEMS CI ON O.CART_ID = CI.CART_ID
        JOIN BOOK B ON CI.BOOK_ID = B.ID
    ) C ON C.WRITER_ID = WRITER.ID
    WHERE BOOK.PUBLISHER = :p_name 
    GROUP BY WRITER.ID, NAME
    `;
    const binds = {
        p_name
    }
    try {
        return (await database.execute(query, binds, database.options)).rows;
    } catch(err) {
        console.log(err);
    }
}

async function addWriter(w_name, description) {
    const query = `BEGIN 
                    :OUTPUT := ADD_WRITER();
                    end;`;
    const binds = {
        w_name,
        description, 
        output: {
            dir: OracleDB.BIND_OUT,
            type: OracleDB.STRING
        }
    }
    try {
        const result =  (await database.execute(query, binds, database.options)).rows;
        return result.outBinds.BIND_OUT;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    getAllWriterInfoByPublisher,
    addWriter
};