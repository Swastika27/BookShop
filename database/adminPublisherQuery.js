const database = require('./database');

async function updatePublisher(name, address, email) {
    const query = `UPDATE PUBLISHER 
                    SET ADDRESS = :P_ADDRESS, EMAIL = :P_EMAIL
                    WHERE NAME = :P_NAME`;
    const binds = {
        P_NAME: name,
        P_ADDRESS:address,
        P_EMAIL: email
    }

    await database.execute(query, binds, database.options);
    return;
}

async function getAllPublisherInfo() {
    const query = `SELECT NAME, EMAIL, ADDRESS, TOTAL_WRITER, TOTAL_BOOK, Total_sold
                    FROM PUBLISHER 
                    Left outer JOIN (SELECT PUBLISHER, COUNT(WRITER_ID) AS TOTAL_WRITER, COUNT(ID) AS TOTAL_BOOK 
                        FROM BOOK
                        group by publisher
                        ) B 
                    ON B.PUBLISHER = PUBLISHER.NAME
                    left outer JOIN (
                        SELECT PUBLISHER, SUM(QUANTITY) as total_sold
                        FROM CARTITEMS JOIN BOOK
                        ON CARTITEMS.BOOK_ID = BOOK.ID
                        GROUP BY PUBLISHER
                    ) C ON C.PUBLISHER = PUBLISHER.NAME
                    ORDER BY TOTAL_SOLD DESC NULLS LAST, TOTAL_BOOK DESC NULLS LAST`;
    const binds = {};
    return (await database.execute(query, binds, database.options)).rows;
}

async function getPublisherAllInfo(p_name) {
    const query = `SELECT NAME, ADDRESS, EMAIL
                    FROM PUBLISHER 
                    WHERE NAME LIKE :NAME`;
    const binds = {
        name: `${p_name}%`
    }
    return (await database.execute(query, binds, database.options)).rows;
}

async function deletePublisher(p_name) {
    const query = `delete 
                    from publisher
                    where name like :name`;
    const binds = {
        name: `${p_name}%`
    }
    return (await database.execute(query, binds, database.options)).rows;

}

async function addNewPublisher(name, address, email) {
    const query = `INSERT INTO PUBLISHER(NAME, ADDRESS, EMAIL) 
                    VALUES(:NAME, :ADDRESS, :EMAIL)`;
    const binds = {
        name: name,
        address: address,
        email: email
    }
    return (await database.execute(query, binds, database.options)).rows;

}

module.exports = {
    updatePublisher,
    getAllPublisherInfo,
    getPublisherAllInfo,
    deletePublisher,
    addNewPublisher
};
