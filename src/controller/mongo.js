const mongoService = require("../service/mongo");
const joiValidation = require("../model/currencyJoi");

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
    res.status(201).json(addedCurrency);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

module.exports = { getCount, createCurrency };
