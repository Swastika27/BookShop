// configuring .env variables
require('dotenv').config();

const app = require('./app');
const database = require('./database/database');
const port = process.env.port;

process.env.UV_THREADPOOL_SIZE = 10;

app.listen(port, async() => {
    try {
        await database.startup();
        console.log('database started');
    } catch(err) {
        console.log('could not start database');
        console.log(err);
        process.exit(1);
    }
});

process
    .once('SIGTERM', database.shutdown)
    .once('SIGINT', database.shutdown);

    