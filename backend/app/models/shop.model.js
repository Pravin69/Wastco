const mongoose = require("mongoose");

const shopOwnerSchema = new mongoose.Schema({
  shopid: String,
  shopUsername: String,
  shopProfile: String,
  shopEmail: String,
  shopPassword: String,
  shopLocation: String,
  dustbinId: String,
  roles:  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  dustbinUsedCount:  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DustbinHistory",
    },
  ],
  dustbinUsed: {
    type: Number,
    default: 0,
  },
  shopCoins: {
    type: Number,
    default: 0,
  },
  bottlePurchased: {
    type: Number,
    default: 0,
  },
  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShopHistory",
    },
  ],
  dustbinLocation: String,
  qrCode: String,
});

const ShopOwner = mongoose.model("ShopOwner", shopOwnerSchema);

module.exports = ShopOwner;
