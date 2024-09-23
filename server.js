const path = require("path");
const express = require("express");

const app = express();


const PORT = 3000;

async function startServer() {
    try {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}...`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

startServer()

