const Currency = require("../model/currency");

const getDbCount = async () => {
  try {
    const count = await Currency.count();
    return count;
  } catch (error) {
    throw new Error(`Failed to get db count" ${error?.message}`);
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
    throw new Error(`Failed to populate db" ${error?.message}`);
  }
};

module.exports = { getDbCount, populateDb };
