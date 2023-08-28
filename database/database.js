oracledb = require('oracledb');
oracledb.autoCommit = true;

const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT
}

async function startup() {
    try {
        await oracledb.createPool({
            user: "rokomari",
            password: "12345",
            connectionString: "localhost/ORCLPDB",
            poolMin: 4,
            poolMax: 10,
            poolIncrement: 1
        });
    } catch (err) {
        console.log('error while creating connection pool: ' , err);
    }
}

async function shutdown() {
    try {
        await oracledb.getPool().close(10);
        console.log('connection closed');
    }
    catch(err) {
        console.log(err);
    }
}

async function execute(query, binds, options) {
    let connection, data;
    try {
        connection = await oracledb.getConnection();
        data = await connection.execute(query, binds, options);
    } catch(err) {
        console.log(err);
    } finally {
        if(connection) {
            try {
                await connection.close();
            } catch (err) {
                console.log(err);
            }
        }
    }
    return data;
}

module.exports = {
    options,
    startup,
    shutdown,
    execute    
};