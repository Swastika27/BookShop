const database = require('./database');

async function getInfoFromName( user_email) {
    const query = `SELECT * FROM PUBLISHER
                    WHERE email = :email`;
    const binds = {
        email: user_email
    }
    return (await database.execute(query, binds, database.options)).rows;

}

module.exports = {
    getInfoFromName
}