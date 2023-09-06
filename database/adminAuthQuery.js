const database = require('./database');

async function getInfoFromEmail (email) {
    const query = `SELECT * FROM ADMIN
                    WHERE EMAIL = :EMAIL`;
    const binds = {
        email: email
    };

    return (await database.execute(query, binds, database.options)).rows;
}

module.exports = {
    getInfoFromEmail
}