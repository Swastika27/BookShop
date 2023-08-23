const database = require('./database');

async function getAllAuthors () {
    const query = `SELECT NAME, ID FROM WRITER ORDER BY NAME`;
    const binds = {};
    return (await database.execute(query, binds, database.options)).rows;
};

async function getAuthorById (id) {
    const query = `SELECT * FROM WRITER WHERE id = :id`;
    const binds = {id};
    return (await database.execute(query, binds, database.options)).rows;
};

module.exports = {
    getAllAuthors, 
    getAuthorById
}