const Currency = require("../model/currencySchema");

const getDbCount = async () => {
  try {
    const count = await Currency.count();
    return count;
  } catch (error) {
    throw new Error(`Failed to get db count: ${error?.message}`);
  }
};

/**
 * Receives a rate list and splits it into smallers rates
 * @currencyList rates object
 * @returns {array}
 */

const populateDb = async (currencyList) => {
  try {
    const insertedData = await Currency.create(currencyList);
    console.log("Db successfully populated!");
    return insertedData;
  } catch (error) {
    throw new Error(`Failed to populate db: ${error?.message}`);
  }
};

const findCurrency = async (currencies) => {
  try {
    const result = await Currency.find({ currency: { $in: currencies } });
    return result;
  } catch (error) {
    throw new Error(`Failed finding currencies: ${error?.message}`);
  }
};

const addCurrency = async (newCurrency) => {
  try {
    const result = await Currency.create(newCurrency);
    return result;
  } catch (error) {
    throw new Error(`Failed finding currencies: ${error?.message}`);
  }
};

module.exports = { getDbCount, populateDb, findCurrency, addCurrency };
