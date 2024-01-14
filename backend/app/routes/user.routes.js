const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/reward-data/:userId?",
    [authJwt.verifyToken],
    controller.getRewardData
  ); // Modified route for fetching reward data

  app.get(
    "/api/test/shopowner/dustbin-history/:shopId?",
    [authJwt.verifyToken],
    controller.getDustbinHistory
  );

  app.post(
    "/api/test/reward-form-data",
    [authJwt.verifyToken],
    controller.saveRewardFormData
  );

  app.get("/api/test/user-data", [authJwt.verifyToken], controller.getUserData); // Added route for fetching user data

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/test/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUsers
  );

  app.get(
    "/api/test/shop-owners",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getShopOwners
  );

  app.post(
    "/api/test/submit-bottle-data",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.submitBottleData
  );

  app.get(
    "/api/test/increase-active-user-count",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.increaseActiveUserCount
  );

  app.get(
    "/api/test/increase-active-shop-count",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.increaseActiveShopCount
  );

  app.get(
    "/api/test/bottles",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllBottles
  );
  
  app.get(
    "/api/test/shop-data",
    [authJwt.verifyToken],
    controller.getAllShopOwners
  );

  
  app.get(
    "/api/test/shop-owner-data",
    [authJwt.verifyToken],
    controller.getShopOwnerData
    );
    
    app.post(
      "/api/test/update-coin",
      [authJwt.verifyToken],
      controller.updateCoinsCount
    );
  app.get(
    "/api/test/most-used-dustbin/:userId?",
    [authJwt.verifyToken],
    controller.findMostUsedDustbinAndShopUsername
  );

  app.post(
    "/api/test/update-shop-coins",
    [authJwt.verifyToken],
    controller.updateShopCoinsCount
  );

  app.get(
    "/api/test/most-used-dustbin-user",
    [authJwt.verifyToken],
    controller.findMostUsedDustbinAndUserWithMaxDisposeCount
  );
};
