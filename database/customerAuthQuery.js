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
    const query = `BEGIN 
    INSERT INTO CUSTOMERS(CUSTOMER_NAME, CUSTOMER_EMAIL, CUSTOMER_PASSWORD) 
    VALUES (:name, :email, :password);
    COMMIT;
    END; `;
    const binds = {
        name : customer.name,
        email: customer.email,
        password: customer.password
    };

    return await database.execute(query, binds, database.options).rows;
};

async function getLoginInfoFromEmail(user_email) {
    console.log('email ', user_email);
    const query = `select *
    from customers
    WHERE CUSTOMER_EMAIL = :email`;
    binds = {
        email: user_email
    };

    try {
        const result = await database.execute(query, binds, database.options);
        if (result && result.rows) {
            console.log('error in databasse ' + result);
            return result.rows;
        } else {
            throw new Error('No rows returned from the query');
        }
    } catch (error) {
        console.error('Database query error:', error);
        // Handle the error, return an error response, or rethrow the error.
    }
    
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