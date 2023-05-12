const axios = require("axios");
const assert = require("assert");
const { COINBASE_API_URI } = process.env;

assert.ok(
  COINBASE_API_URI,
  "COINBASE_API_URL must be provided before using this application"
);

const fetchCurrencyRates = async () => {
  try {
    const { data: rates } = await axios.get(COINBASE_API_URI);
    return rates;
  } catch (error) {
    throw new Error(`Failed to fetch currency rates: " ${error?.message}`);
  }
};

module.exports = { fetchCurrencyRates };
