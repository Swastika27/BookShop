const database = require ('./database');

async function getAllPublishers() {
    const query = `SELECT NAME FROM PUBLISHER ORDER BY NAME`;
    const binds = {}
    return (await database.execute(query, binds, database.options)).rows;
};

async function getPublisherByName(publisher_name) {
    const query = `Select * from publisher where name Like :name`;
    const binds = {
        name: {
            dir:oracledb.BIND_IN,
            val: publisher_name,
            type: oracledb.STRING
        }
    };
    return (await database.execute(query, binds, database.options)).rows;
};

module.exports = {
    getAllPublishers,
    getPublisherByName
}