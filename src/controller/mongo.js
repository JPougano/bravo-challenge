const mongoService = require("../service/mongo");
const joiValidation = require("../model/currencyJoi");
const Redis = require("../../redis");
const { CURRENCY_RATE_CACHE_KEY } = process.env;

const getCount = async (req, res) => {
  try {
    const count = await mongoService.getDbCount();
    res.status(200).json(count);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

const createCurrency = async (req, res) => {
  const { currency, rate } = req.body;

  const newCurrency = {
    currency: currency.toUpperCase(),
    rate: rate,
  };

  const { error } = joiValidation.validate(newCurrency);
  if (error) {
    res.status(400).json(error.details);
    throw new Error(error);
  }

  try {
    const currencyExist = await mongoService.findCurrency(newCurrency.currency);
    if (currencyExist.length != 0) {
      res.status(500).json({ error: true, message: "Currency already exists" });
      return;
    }

    const addedCurrency = await mongoService.addCurrency(newCurrency);
    const allCurrencies = await mongoService.getAllRecords();
    Redis.set(CURRENCY_RATE_CACHE_KEY, allCurrencies);

    res.status(201).json(addedCurrency);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

const deleteCurrency = async (req, res) => {
  const { currency } = req.query;
  try {
    const deletedCurrency = await mongoService.deleteCurrency(currency);
    if (!deletedCurrency) {
      res
        .status(500)
        .json({ error: true, message: "Currency does not exists" });
      return;
    }
    res.status(204).json(deletedCurrency);
  } catch (error) {
    res.status(500).json(error);
    throw new Error(error);
  }
};

module.exports = { getCount, createCurrency, deleteCurrency };
