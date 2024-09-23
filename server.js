const path = require("path");
const express = require("express");

const app = express();

const categoryRouter = require("./routes/category.routes");
const fundraiserRouter = require("./routes/fundraiser.routes");
const { createConnection } = require("./crowdfunding_db");


app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());


app.use("/category", categoryRouter);
app.use("/fundraiser", fundraiserRouter);

app.use("*", (req, res) => {
    res.status(404).send();
});

const PORT = 3000;

async function startServer() {
    try {
        await createConnection();
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}...`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

startServer()

