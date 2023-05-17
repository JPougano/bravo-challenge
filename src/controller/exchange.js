const exchangeService = require("../service/exchange");
const mongoService = require("../service/mongo");
const Redis = require("../../redis");
const logger = require("../../logger");
const { CURRENCY_RATE_CACHE_KEY } = process.env;

const getConvertion = async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    res.status(404).json({
      error: true,
      message:
        "'from', 'to', and 'amount' must be provided before converting currency",
    });
    return;
  }

  const dataToConvert = {
    from: from.toUpperCase(),
    to: to.toUpperCase(),
    amount: amount,
  };

  const cachedData = await Redis.get(CURRENCY_RATE_CACHE_KEY);

  let conversion;

  if (cachedData) {
    const cachedRateList = JSON.parse(cachedData);
    try {
      conversion = exchangeService.convertCurrency(
        cachedRateList,
        dataToConvert
      );
      res.status(200).json({
        from: dataToConvert.from,
        to: dataToConvert.to,
        amount: amount,
        conversion: conversion,
        fromCahe: true,
      });
    } catch (error) {
      logger.error(error);
      res
        .status(500)
        .json({ error: true, message: "Failed to get currency conversion" });
    }
    return;
  }

  try {
    const currecyRates = await mongoService.findCurrency([
      dataToConvert.from,
      dataToConvert.to,
    ]);
    conversion = exchangeService.convertCurrency(currecyRates, dataToConvert);
    res.status(200).json({
      from: dataToConvert.from,
      to: dataToConvert.to,
      amount: amount,
      conversion: conversion,
      fromCahe: false,
    });
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ error: true, message: "Failed to get currency conversion" });
  }
};

module.exports = {
  getConvertion,
};
