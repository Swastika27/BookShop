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

async function getAllWritersOfPublisher(publisher_name) {
    const query = `select * from writer 
                    where id in (
                        select writer_id 
                        from book 
                        where publisher = :name
                    )`;
    const binds = {
        name: publisher_name
    }
} 

module.exports = {
    getAllPublishers,
    getPublisherByName,
    getAllWritersOfPublisher
}