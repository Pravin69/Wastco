const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const ShopOwner = db.shopOwner; // Add this line

checkDuplicateUsernameOrEmail = (req, res, next) => {
  let userDuplicateFound = false; // Flag variable for user duplicates

  // Username
  User.findOne({ userid: req.body.userid }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Userid is already in use!" });
      userDuplicateFound = true;
      return;
    }

    // Email
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        userDuplicateFound = true;
        return;
      }

      if (!userDuplicateFound) {
        next(); // Call next only if no user duplicates were found
      }
    });
  });
};

checkDuplicateShopOwner = (req, res, next) => {
  // Shop Username
  ShopOwner.findOne({ shopid: req.body.shopid }).exec((err, shopOwner) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (shopOwner) {
      res.status(400).send({ message: "Failed! Shop Id is already in use!" });
      return;
    }

    // Shop Email
    ShopOwner.findOne({ shopEmail: req.body.shopEmail }).exec((err, shopOwner) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (shopOwner) {
        res.status(400).send({ message: "Failed! Shop Email is already in use!" });
        return;
      }

      next(); // Call next if no shop duplicates were found
    });
  });
};


checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({ message: `Failed! Role ${req.body.roles[i]} does not exist!` });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkDuplicateShopOwner,
  checkRolesExisted
};

module.exports = verifySignUp;
