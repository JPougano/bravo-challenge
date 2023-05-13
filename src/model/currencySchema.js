const mongoose = require("mongoose");

const Currency = mongoose.model("currency-rate", {
  currency: { type: String, required: true, unique: true },
  rate: { type: Number, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

module.exports = Currency;
