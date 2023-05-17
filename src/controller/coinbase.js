const coinbaseService = require("../service/coinbase");
const logger = require("../../logger");

const getCurrencyRates = async (req, res) => {
  try {
    const rates = await coinbaseService.fetchCurrencyRates();
    res.status(200).json(rates);
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ error: true, message: "Failed to fetch currency rates" });
  }
};

module.exports = { getCurrencyRates };
