const mongoose = require("mongoose");

const cuponSchema = new mongoose.Schema({
  discount: Number,
  claimStatus: {
    type: Boolean,
    default: false,
  },
  cuponTimer: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // Set default value as current date + 24 hours
  },
  expired: {
    type: Boolean,
    default: false,
  },
});

const Cupon = mongoose.model("Cupon", cuponSchema);

module.exports = Cupon;
