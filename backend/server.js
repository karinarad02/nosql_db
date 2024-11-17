const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const movieController = require("./controllers/movieController");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

async function startServer() {
  try {
    await movieController.connectToDatabase();
    console.log("Connected to MongoDB");

    const movieRouter = require("./routes/movieRoutes");

    app.use("/movies", movieRouter);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

startServer();
