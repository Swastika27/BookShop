const database = require('./database');

async function updatePublisher(name, address, email) {
    const query = `UPDATE PUBLISHER 
                    SET ADDRESS = :P_ADDRESS, EMAIL = P_EMAIL
                    WHERE NAME = :P_NAME`;
    const binds = {
        P_NAME: name,
        P_ADDRESS:address,
        P_EMAIL: email
    }

    await database.execute(query, binds, database.options);
    return;
}

module.exports = {
    updatePublisher
};
