const express = require("express");
const mongoose = require("mongoose");
const assert = require("assert");
const morgan = require("morgan");
const router = require("./routes");
const coinbaseService = require("./service/coinbase");
const mongoService = require("./service/mongo");
const { splitRates } = require("./utils");

const { SERVER_PORT, DB_CONNECTION_URI } = process.env;

const app = express();
const PORT = SERVER_PORT || 5001;

assert.ok(
  DB_CONNECTION_URI,
  "DB_CONNECTION_URI must be provided before using this application"
);

(async () => {
  try {
    await mongoose.connect(DB_CONNECTION_URI);
    console.log("Successfully connected to mongoDb");

    const isDbPopulated = Boolean(await mongoService.getDbCount());
    if (!isDbPopulated) {
      const {
        data: { rates },
      } = await coinbaseService.fetchCurrencyRates();
      const rateList = splitRates(rates);
      await mongoService.populateDb(rateList);
    }

    startServer();
  } catch (error) {
    console.error("Error setting up server:", error);
    process.exit(1);
  }
})();

const startServer = () => {
  app.use("/", morgan("dev"));
  app.use("/", router);

  app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
  });
};
