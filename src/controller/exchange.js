const exchangeService = require("../service/exchange");
const mongoService = require("../service/mongo");

const getConvertion = async (req, res) => {
  const { from, to, amount } = req.query;

  const dataToConvert = {
    from: from.toUpperCase(),
    to: to.toUpperCase(),
    amount: amount,
  };

  let conversion;

  if (!from || !to || !amount) {
    res.status(503).json({
      error: true,
      message:
        "'from', 'to', and 'amount' must be provided before converting currency",
    });
    return;
  }
  try {
    const currecyRates = await mongoService.findCurrency([
      dataToConvert.from,
      dataToConvert.to,
    ]);
    conversion = exchangeService.convertCurrency(currecyRates, dataToConvert);
    res.json({
      from: dataToConvert.from,
      to: dataToConvert.to,
      amount: amount,
      conversion: conversion,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: true, message: "Failed to get currency conversion" });
  }
};

module.exports = {
  getConvertion,
};
