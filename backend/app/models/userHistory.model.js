const mongoose = require("mongoose");

const userHistorySchema = new mongoose.Schema({
  dustbinId: {
    type: String,
    required: true,
  },
  dustbinLocation: {
    type: String,
    required: true,
  },
  bottleId: {
    type: String,
    required: true,
  },
  bottleContent: {
    type: String,
    required: true,
  },
  bottleExpiryDate: {
    type: String,
    required: true,
  },
  userLocation: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  bottleDispose: {
    type: Number,
    default: 1,
  },
  coins: {
    type: Number,
    default: 0,
  },
});

const UserHistory = mongoose.model("UserHistory", userHistorySchema);

module.exports = UserHistory;
