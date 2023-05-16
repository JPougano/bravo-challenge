const express = require("express");
const mongoose = require("mongoose");
const assert = require("assert");
const morgan = require("morgan");
const router = require("./routes");
const coinbaseService = require("./service/coinbase");
const mongoService = require("./service/mongo");
const { splitRates } = require("./utils");
const Redis = require("../redis");
const CONFIG = require("../config");

const { SERVER_PORT, CURRENCY_RATE_CACHE_KEY } = process.env;

const app = express();
const PORT = SERVER_PORT || 5001;

assert.ok(
  CURRENCY_RATE_CACHE_KEY,
  "CURRENCY_RATE_CACHE_KEY must be provided before using this application"
);

(async () => {
  try {
    await mongoose.connect(CONFIG.DB_CONNECTION_URI);
    console.log("Successfully connected to mongoDb");
    Redis.connect();
    const isDbPopulated = Boolean(await mongoService.getDbCount());
    if (!isDbPopulated) {
      const {
        data: { rates },
      } = await coinbaseService.fetchCurrencyRates();
      const rateList = splitRates(rates);
      await mongoService.populateDb(rateList);
      Redis.set(CURRENCY_RATE_CACHE_KEY, JSON.stringify(rateList));
    }

    startServer();
  } catch (error) {
    console.error("Error setting up server:", error);
    process.exit(1);
  }
})();

const startServer = () => {
  app.use("/", morgan("dev"));
  app.use(express.json());
  app.use("/", router);

  const server = app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
  });

  process.on("SIGINT", async () => {
    try {
      server.close();
      await Redis.quit();
      await mongoose.connection.close();
      console.log("Server shuted down");
      process.exit(0);
    } catch (error) {
      console.error("Error closing connections:", error);
      process.exit(1);
    }
  });
};
