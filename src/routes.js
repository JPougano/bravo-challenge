const express = require("express");
const router = express.Router();
const exchangeController = require("../src/controller/exchange");

router.get("/currencyConversion", exchangeController.getConvertion);

module.exports = router;
