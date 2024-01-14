const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    // console.log(req.userId);
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isShopOwner = (req, res, next) => {
  ShopOwner.findById(req.userId).exec((err, shopOwner) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!shopOwner) {
      return res.status(404).send({ message: "Shop Owner not found." });
    }

    Role.find(
      {
        _id: { $in: shopOwner.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "shopowner") {
            next();
            return;
          }
        }

        return res.status(403).send({ message: "Require Shop Owner Role!" });
        
      }
    );
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isShopOwner: isShopOwner,
};

module.exports = authJwt;

