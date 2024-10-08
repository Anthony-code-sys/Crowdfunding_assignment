// const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

const categoryRouter = require("./routes/category.routes");
const fundraiserRouter = require("./routes/fundraiser.routes");
const donationRouter = require("./routes/donation.routes");
const searchRouter = require("./routes/search.routes");
const { createConnection } = require("./crowdfunding_db");

app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:3000"] }));

// app.use("/", express.static(path.join(__dirname, "public")));


app.use(express.json());

app.use("/api/categories", categoryRouter);
app.use("/api/donations", donationRouter);
app.use("/api/fundraisers", fundraiserRouter);
app.use("/api/search", searchRouter);

app.use("*", (_req, res) => {
  res.status(404).send();
});

const PORT = 8080;

async function startServer() {
  try {
    await createConnection();
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
