const express = require("express");
const router = express.Router();
const exchangeController = require("../src/controller/exchange");
const mongoController = require("../src/controller/mongo");

router.get("/currencyConversion", exchangeController.getConvertion);
router.post("/currencyAddition", mongoController.createCurrency);

module.exports = router;
