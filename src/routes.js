const express = require("express");
const router = express.Router();
const coinbaseController = require("../src/controller/coinbase");

router.get("/", coinbaseController.getCurrencyRates);

module.exports = router;
