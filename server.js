// const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

const categoryRouter = require("./routes/category.routes");
const fundraiserRouter = require("./routes/fundraiser.routes");
const { createConnection } = require("./crowdfunding_db");

app.use(cors({ origin: "*" }));

// app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/api/categories", categoryRouter);
app.use("/api/fundraisers", fundraiserRouter);

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/search", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "search.html"));
// });

// app.get("/fundraiser", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "details.html"));
// });

app.use("*", (_req, res) => {
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
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
