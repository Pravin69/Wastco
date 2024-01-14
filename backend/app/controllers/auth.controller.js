const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const ShopOwner = db.shopOwner;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // console.log(req.body);

  const salt = bcrypt.genSaltSync(10);
  const password = req.body.password;
  const user = new User({
    userid: req.body.userid,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(password, salt),
    profile: req.body.profile || "",
    address: req.body.address,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.shopOwnerSignup = (req, res) => {
  // console.log(req.body);

  const salt = bcrypt.genSaltSync(10);
  const password = req.body.shopPassword;
  const shopOwner = new ShopOwner({
    shopid: req.body.shopid,
    shopUsername: req.body.shopUsername,
    shopProfile: req.body.shopProfile || "",
    shopPassword: bcrypt.hashSync(password, salt),
    shopEmail: req.body.shopEmail,
    shopLocation: req.body.shopLocation,
    dustbinId: req.body.dustbinid,
    dustbinLocation: req.body.shopLocation,
    qrCode: req.body.qrcode || "",
  });

  shopOwner.save((err, shopOwner) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne({ name: "shopowner" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      shopOwner.roles = [role._id];
      shopOwner.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        return res.send({ message: "ShopOwner was registered successfully!" });
      });
    });
  });
};

// exports.signin = (req, res) => {
//   User.findOne({
//     userid: req.body.userid,
//   })
//     .populate("roles", "-__v")
//     .exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }

//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );

//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!",
//         });
//       }

//       var token = jwt.sign({ id: user.id }, config.secret, {
//         expiresIn: 86400, // 24 hours
//       });

//       const roles = user.roles.map((role) => {
//         const roleName = role.name.toLowerCase();
//         return roleName.charAt(0).toUpperCase() + roleName.slice(1);
//       });

//       const userResponse = {
//         userid: user.userid,
//         username: user.username,
//         email: user.email,
//         roles: roles,
//         profile: user.profile, // Assuming the profile image is stored in the 'data' field of the profile object
//         address: user.address,
//         bottleDisposed: user.bottleDisposeCount,
//         coinsEarned: user.coinsCount,
//         accessToken: token,
//       };

//       // console.log(userResponse);

//       res.status(200).send(userResponse);
//     });
// };

exports.signin = (req, res) => {
  User.findOne({
    userid: req.body.userid,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        // If no regular user found, try finding a shop owner
        ShopOwner.findOne({
          shopid: req.body.userid,
        })
          .populate("roles", "-__v")
          .exec((err, shopOwner) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            if (!shopOwner) {
              return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
              req.body.password,
              shopOwner.shopPassword
            );

            if (!passwordIsValid) {
              return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
              });
            }

            var token = jwt.sign({ id: shopOwner.id }, config.secret, {
              expiresIn: 86400, // 24 hours
            });

            const roles = shopOwner.roles.map((role) => {
              const roleName = role.name.toLowerCase();
              return roleName.charAt(0).toUpperCase() + roleName.slice(1);
            });

            const shopOwnerResponse = {
              shopid: shopOwner.shopid,
              shopUsername: shopOwner.shopUsername,
              shopProfile: shopOwner.shopProfile,
              shopEmail: shopOwner.shopEmail,
              shopLocation: shopOwner.shopLocation,
              dustbinId: shopOwner.dustbinId,
              dustbinUsed: shopOwner.dustbinUsed,
              shopCoins: shopOwner.shopCoins,
              bottlePurchased: shopOwner.bottlePurchased,
              history: shopOwner.history,
              dustbinLocation: shopOwner.dustbinLocation,
              qrCode: shopOwner.qrCode,
              roles: roles,
              accessToken: token,
            };

            res.status(200).send(shopOwnerResponse);
          });
      } else {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // 24 hours
        });

        const roles = user.roles.map((role) => {
          const roleName = role.name.toLowerCase();
          return roleName.charAt(0).toUpperCase() + roleName.slice(1);
        });

        const userResponse = {
          userid: user.userid,
          username: user.username,
          email: user.email,
          roles: roles,
          profile: user.profile,
          address: user.address,
          bottleDisposeCount: user.bottleDisposeCount,
          coinsEarned: user.coinsCount,
          activeUsers: user.activeUsers,
          activeShops: user.activeShops,
          accessToken: token,
        };

        res.status(200).send(userResponse);
      }
    });
};
