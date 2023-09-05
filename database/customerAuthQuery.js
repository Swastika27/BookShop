const database = require('./database');

async function getUserIdFromEmail(email) {
    const query = `SELECT ID
                    FROM CUSTOMERS
                    WHERE CUSTOMER_EMAIL = :email`;
    const binds = {
        email
    };

    return (await database.execute(query, binds, database.options)).rows;
};

async function createNewCustomer (customer) {
    const query = `INSERT INTO CUSTOMERS(CUSTOMER_NAME, CUSTOMER_EMAIL, CUSTOMER_PASSWORD) 
    VALUES (:name, :email, :password)`;
    const binds = {
        name : customer.name,
        email: customer.email,
        password: customer.password
    };

    return await database.execute(query, binds, database.options).rows;
};

async function getLoginInfoFromEmail(email) {
    const query = `SELECT ID, CUSTOMER_NAME, CUSTOMER_PASSWORD 
    From Customers
    WHERE CUSTOMER_EMAIL = :email`;
    binds = {
        email
    };

    return (await database.execute(query, binds, database.options)).rows;
};

async function getLoginInfoFromId (id) {
    const query = `SELECT ID, CUSTOMER_NAME, CUSTOMER_PASSWORD, CUSTOMER_EMAIL 
    FROM CUSTOMERS
    WHERE ID = :id`;
    const binds = {
        id
    };

    return (await database.execute(query, binds, database.options)).rows;
};

module.exports = {
    createNewCustomer,
    getUserIdFromEmail,
    getLoginInfoFromEmail,
    getLoginInfoFromId
}