const {Client} = require('pg');

const pool = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Aa123456",
    database: "postgres"
});

const connectClient = async () => {
    await pool.connect();
}

const closeClient = async () => {
    await pool.end();
}

 module.exports = {
    pool,
    connectClient,
    closeClient
 };