const mongoose = require("mongoose");

const dustbinHistorySchema = new mongoose.Schema({
  dustbinUsed: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

const DustbinHistory = mongoose.model("DustbinHistory", dustbinHistorySchema);

module.exports = DustbinHistory;
