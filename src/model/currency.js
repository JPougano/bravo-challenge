const mongoose = require("mongoose");

const Currency = mongoose.model("currency-rate", {
  currency: { type: String, required: true },
  rate: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

module.exports = Currency;
