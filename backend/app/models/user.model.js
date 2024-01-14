const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userid: String,
  username: String,
  email: String,
  password: String,
  profile: String,
  address: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserHistory",
    },
  ],
  bottleDisposeCount: {
    type: Number,
    default: 0,
  },
  coinsCount: {
    type: Number,
    default: 0,
  },
  activeUsers: {
    type: Number,
    default: 0,
  },
  activeShops: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
