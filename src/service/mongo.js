const Currency = require("../model/currency");

const getDbCount = async () => {
  try {
    const count = await Currency.count();
    return count;
  } catch (error) {
    throw new Error(`Failed to get db count" ${error?.message}`);
  }
};

module.exports = { getDbCount };
