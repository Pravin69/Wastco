const mongoose = require("mongoose");

const bottleSchema = new mongoose.Schema({
  bottleId: String,
  content: String,
  expiryDate: String,
  shopPurchased: {
    type: String,
    default: "No",
  },
  userPurchased: {
    type: String,
    default: "No",
  },
  claimStatus: {
    type: String,
    default: "No",
  }
});

const Bottle = mongoose.model("Bottle", bottleSchema);

module.exports = Bottle;