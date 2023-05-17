const mongoose = require("mongoose");
const cron = require("node-cron");
const coinbaseService = require("../src/service/coinbase");
const mongoService = require("../src/service/mongo");
const Redis = require("../redis");
const { splitRates } = require("../src/utils");
const CONFIG = require("../config");
const logger = require("../logger");
const { CRON_SCHEDULE, CURRENCY_RATE_CACHE_KEY } = process.env;

(async () => {
  await mongoose.connect(CONFIG.DB_CONNECTION_URI);
  logger.info("Mongodb connected");
  await Redis.connect();
})();

cron.schedule(CRON_SCHEDULE, async () => {
  try {
    const {
      data: { rates },
    } = await coinbaseService.fetchCurrencyRates();
    const rateList = splitRates(rates);
    const { modifiedCount, matchedCount } =
      await mongoService.updateManyCurrencies(rateList);
    const allCurrencies = await mongoService.getAllRecords();
    logger.warn(
      `${matchedCount} documents found. ${modifiedCount} documents updated`
    );
    await Redis.set(CURRENCY_RATE_CACHE_KEY, allCurrencies);
  } catch (error) {
    logger.error("Error setting up cron job:", error);
    process.exit(1);
  }
});

process.on("SIGINT", async () => {
  try {
    await Redis.quit();
    await mongoose.connection.close();
    logger.debug("Cronjob shuted down");
    process.exit(0);
  } catch (error) {
    logger.error("Error shutting server down:", error);
    process.exit(1);
  }
});
