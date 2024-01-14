const mongoose = require("mongoose");

const shopHistorySchema = new mongoose.Schema({
  bottleCount: {
    type: Number,
    default: 0,
  },
  bottleContent: String,
  discount: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

const ShopHistory = mongoose.model("ShopHistory", shopHistorySchema);

module.exports = ShopHistory;