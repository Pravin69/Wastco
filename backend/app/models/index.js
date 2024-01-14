const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.userHistory = require("./userHistory.model");
db.bottle = require("./bottle.model");
db.shopOwner = require("./shop.model");
db.shopHistory = require("./shopHistory.model");
db.cupon = require("./cupon.model");
db.dustbin = require("./dustbin.model");

db.ROLES = ["user", "admin","shopowner"];

module.exports = db;
