const mysql = require('mysql2/promise');

let connection = null;

async function createConnection() {
    try {
        connection = await mysql.createConnection(
            'mysql://root:root_password@127.0.0.1:3307/crowdfunding_assignment'
        );

        connection.addListener('error', (err) => {
            console.log(err);
        });

        console.log('db connected!');

        return connection;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function getConnection() {
    return connection;
}



module.exports = { createConnection, getConnection };