const User = require("../models/user.model");
const UserHistory = require("../models/userHistory.model");
const ShopOwner = require("../models/shop.model");
const DustbinHistory = require("../models/dustbin.model");
const Bottle = require("../models/bottle.model");

const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

const saveRewardFormData = (req, res) => {
  // Retrieve form data from the request or any other source
  const {
    dustbinId,
    dustbinLocation,
    bottleId,
    bottleContent,
    bottleExpiryDate,
    userLocation,
    coins,
    timestamp,
  } = req.body;

  // Check if any required field is missing
  // console.log(dustbinId,dustbinLocation,bottleId,bottleContent,bottleExpiryDate,userLocation);
  if (
    !dustbinId ||
    !dustbinLocation ||
    !bottleId ||
    !bottleContent ||
    !bottleExpiryDate ||
    !userLocation ||
    !timestamp
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create a new instance of the UserHistory model
  const formData = new UserHistory({
    dustbinId,
    dustbinLocation,
    bottleId,
    bottleContent,
    bottleExpiryDate,
    userLocation,
    coins,
    timestamp,
  });

  // Save the form data to the database
  formData
    .save()
    .then((savedFormData) => {
      // Find the logged-in user by their ID
      User.findById(req.userId)
        .then((user) => {
          // Push the ID of the saved form data to the user's history array
          // console.log(req.userId);
          user.history.push(savedFormData._id);

          // Increment the coinsCount with the incoming coins
          user.bottleDisposeCount += 1;
          user.coinsCount += coins;

          ShopOwner.findOne({ dustbinId })
            .then((shopOwner) => {
              if (!shopOwner) {
                return res.status(404).json({ message: "ShopOwner not found" });
              }

              const dustbinUsed = 0;
              // Create a new DustbinHistory entry
              const dustbinHistory = new DustbinHistory({
                dustbinUsed: dustbinUsed + 1,
                timestamp: timestamp, // Store the current timestamp
              });

              // Save the DustbinHistory entry
              dustbinHistory
                .save()
                .then(() => {
                  // Update the ShopOwner's dustbinUsedCount array with the new DustbinHistory entry
                  shopOwner.dustbinUsedCount.push(dustbinHistory);

                  // Increment the dustbinUsed field by 1
                  shopOwner.dustbinUsed += 1;
                  shopOwner.shopCoins += 1;

                  // Save the updated ShopOwner
                  shopOwner
                    .save()
                    .then((updatedShopOwner) => {})
                    .catch((error) => {
                      console.error(error);
                      return res
                        .status(500)
                        .json({ message: "Failed to update ShopOwner" });
                    });
                })
                .catch((error) => {
                  console.error(error);
                  return res
                    .status(500)
                    .json({ message: "Failed to save DustbinHistory" });
                });
            })
            .catch((error) => {
              console.error(error);
              return res
                .status(500)
                .json({ message: "Failed to retrieve ShopOwner" });
            });

          // Save the updated user with the associated history entry
          user.save().then(() => {
            return res
              .status(200)
              .json({ message: "Reward data successfully saved" });
          });
        })
        .catch((error) => {
          console.log(error);
          return res
            .status(500)
            .json({ message: "Failed to associate reward data with user" });
        });
    })
    .catch((error) => {
      // Failed to save the form data
      console.error(error);
      return res.status(500).json({ message: "Failed to save reward data" });
    });
};

const getRewardData = (req, res) => {
  // Determine the user ID based on the scenario
  const userId = req.params.userId || req.userId;

  // console.log(req.params.userId);

  // Find the user by their ID
  User.findById(userId)
    .populate("history")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const rewardData = user.history.map((history) => ({
        BottleId: history.bottleId,
        BottleContent: history.bottleContent,
        BottleExpiryDate: history.bottleExpiryDate,
        DustbinId: history.dustbinId,
        RewardCoin: history.coins,
        BottleDispose: history.bottleDispose,
        Timestamp: history.timestamp,
      }));

      res.status(200).json(rewardData);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve reward data" });
    });
};

const getUserData = (req, res) => {
  User.findById(req.userId)
    .populate("roles") // Populate the roles field with actual role documents
    .exec()
    .then((user) => {
      // Map the role names and update the user object
      const updatedRoles = user.roles.map((role) => {
        const roleName = role.name.toLowerCase();
        return roleName.charAt(0).toUpperCase() + roleName.slice(1);
      });

      const updatedUser = { ...user._doc, roles: updatedRoles };

      // Send the updated user object in the response
      res.status(200).json({ user: updatedUser });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve user data" });
    });
};

const getShopOwnerData = (req, res) => {
  // Find the shop owner by their ID
  ShopOwner.findById(req.userId)
    .populate("roles") // Populate the roles field with actual role documents
    .exec()
    .then((shopOwner) => {

      // Map the role names and update the user object
      const updatedRoles = shopOwner.roles.map((role) => {
        const roleName = role.name.toLowerCase();
        return roleName.charAt(0).toUpperCase() + roleName.slice(1);
      });

      const updatedUser = { ...shopOwner._doc, roles: updatedRoles };

      res.status(200).json({ shopOwner: updatedUser });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve shop owner data" });
    });
};

const submitBottleData = async (req, res) => {
  const { bottlevolume, bottleContent } = req.body;

  if (!bottlevolume || !bottleContent) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create an array to hold the newly created bottles
    const newBottles = [];
    const expiryYears = Math.random() < 0.5 ? 2 : 3;
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + expiryYears);

    // Create the specified number of bottle instances
    for (let i = 0; i < bottlevolume; i++) {
      const bottleId = generateUniqueId(); // Generate a unique ID for each bottle
      const bottle = new Bottle({
        bottleId,
        content: bottleContent,
        expiryDate: expiryDate.toISOString().substring(0, 10), // Set the expiry date as needed
        userPurchased: true,
        claimStatus: "No",
      });

      // Save each bottle data
      await bottle.save();

      newBottles.push(bottle); // Add the bottle to the array
    }

    return res
      .status(200)
      .json({ message: "Bottle data successfully submitted", newBottles });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to submit bottle data" });
  }
};

// Helper function to generate a unique ID for each bottle
const generateUniqueId = () => {
  // Generate a random unique ID with letters and numbers

  const usedIds = new Set(); // Keep track of used IDs

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";

  // Generate a random 6-character ID
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  // Check if the generated ID is already used
  while (usedIds.has(id)) {
    id = "";

    // Generate a new random 6-character ID
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
  }

  usedIds.add(id); // Add the generated ID to the used IDs set

  return id;
};
const getAllUsers = (req, res) => {
  User.find({})
    .populate({
      path: "roles",
      match: { name: "user" },
    })
    .then((users) => {
      const filteredUsers = users.filter((user) =>
        user.roles.some((role) => role.name === "user")
      );
      console.log(filteredUsers);
      res.status(200).json(filteredUsers);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve users" });
    });
};

const getShopOwners = (req, res) => {
  ShopOwner.find()
    .select(
      "shopid shopUsername shopEmail shopLocation dustbinId dustbinUsed shopCoins bottlePurchased"
    )
    .then((shopOwners) => {
      res.status(200).json(shopOwners);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve shop owners" });
    });
};

const getDustbinHistory = (req, res) => {
  const shopId = req.params.shopId || req.userId;

  console.log(shopId);

  ShopOwner.findById(shopId)
    .populate("dustbinUsedCount")
    .then((shopOwner) => {
      if (!shopOwner) {
        return res.status(404).json({ message: "ShopOwner not found" });
      }

      const dustbinHistory = shopOwner.dustbinUsedCount.map((history) => ({
        DustbinUsed: history.dustbinUsed,
        Timestamp: history.timestamp,
      }));

      res.status(200).json(dustbinHistory);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve dustbin history" });
    });
};

const increaseActiveUserCount = async (req, res) => {
  // Get the user ID from the request object (assuming it's stored in req.userId)
  const userId = req.userId;

  try {
    // Find the user by ID
    const user = await User.findById(userId).populate("roles");

    // Check if the user role is admin
    const isAdmin = user.roles.some((role) => role.name === "admin");
    if (isAdmin) {
      // Get the total count of active users
      const activeUserCount = await User.countDocuments({ active: true });

      // Increase the active user count of the admin user by 1
      user.activeUsers = activeUserCount - 1;

      // Save the updated admin user
      await user.save();

      return res.status(200).json({ activeUsers: user.activeUsers });
    } else {
      return res.status(403).json({
        message: "Access denied. Only admin users can perform this action",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to update active user count" });
  }
};

const increaseActiveShopCount = async (req, res) => {
  // Get the user ID from the request object (assuming it's stored in req.userId)
  const userId = req.userId;

  try {
    // Find the user by ID
    const user = await User.findById(userId).populate("roles");

    // Check if the user role is admin
    const isAdmin = user.roles.some((role) => role.name === "admin");
    if (isAdmin) {
      const activeShopCount = await ShopOwner.countDocuments({ active: true });

      // Increase the active user count of the admin user by 1
      user.activeShops = activeShopCount;

      // Save the updated admin user
      await user.save();

      return res.status(200).json({ activeShops: user.activeShops });
    } else {
      return res.status(403).json({
        message: "Access denied. Only admin users can perform this action",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to update active user count" });
  }
};

const getAllBottles = (req, res) => {
  // Logic to fetch all bottles from the database
  // Example code:
  Bottle.find({})
    .then((bottles) => {
      res.status(200).json(bottles);
    })
    .catch((error) => {
      console.error("Failed to fetch bottles:", error);
      res.status(500).json({ message: "Failed to fetch bottles" });
    });
};

const getAllShopOwners = (req, res) => {
  // Logic to fetch all bottles from the database
  // Example code:
  ShopOwner.find({})
    .then((shops) => {
      res.status(200).json(shops);
    })
    .catch((error) => {
      console.error("Failed to fetch bottles:", error);
      res.status(500).json({ message: "Failed to fetch bottles" });
    });
};

const updateCoinsCount = (req, res) => {
  const userId = req.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Update the coins count for the user
      user.coinsCount = user.coinsCount - 10;
      // Save the updated user object
      return user.save();
    })
    .then((updatedUser) => {
      res.status(200).json({ user: updatedUser });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to update coins count" });
    });
};

const updateShopCoinsCount = (req, res) => {
  const userId = req.userId;

  ShopOwner.findById(userId)
    .then((shopOwner) => {
      if (!shopOwner) {
        return res.status(404).json({ message: "Shop owner not found" });
      }
      // Update the shopCoins count for the shop owner
      shopOwner.shopCoins = shopOwner.shopCoins - 10;
      // Save the updated shop owner object
      return shopOwner.save();
    })
    .then((updatedShopOwner) => {
      res.status(200).json({ shopOwner: updatedShopOwner });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to update shopCoins count" });
    });
};

const findMostUsedDustbinAndShopUsername = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you pass the user ID as a parameter

    const user = await User.findById(userId).populate("history").exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userHistories = user.history;

    const mostUsedDustbin = await UserHistory.aggregate([
      { $match: { _id: { $in: userHistories } } },
      {
        $group: {
          _id: "$dustbinId",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    if (mostUsedDustbin.length === 0) {
      return res.status(404).json({
        message: "No user history or corresponding dustbin found",
      });
    }

    // console.log(mostUsedDustbinId);
    const mostUsedDustbinId = mostUsedDustbin[0]._id;

    const shopOwner = await ShopOwner.findOne({ dustbinId: mostUsedDustbinId });
    // console.log(shopOwner);

    if (!shopOwner) {
      return res.status(404).json({ message: "Shop owner not found" });
    }

    const shopOwnerName = shopOwner.shopUsername;

    return res.json({ mostUsedDustbinId, shopOwnerName });
  } catch (error) {
    console.error("Error finding most used dustbin ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const findMostUsedDustbinAndUserWithMaxDisposeCount = async (req, res) => {
  try {
    // Find the top shop owners based on dustbin usage
    const topShopOwners = await ShopOwner.aggregate([
      { $sort: { dustbinUsed: -1 } },
      { $limit: 1 }, // Adjust the limit as per your requirement
    ]);

    // Find the top users based on bottleDisposeCount
    const topUsers = await User.aggregate([
      { $sort: { bottleDisposeCount: -1 } },
      { $limit: 1 }, // Adjust the limit as per your requirement
    ]);

    return res.json({ topShopOwners, topUsers });
  } catch (error) {
    console.error(
      "Error finding top shop owners based on dustbin usage:",
      error
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  // Other controller methods...
  allAccess,
  userBoard,
  adminBoard,
  saveRewardFormData,
  getRewardData,
  getUserData,
  getAllUsers,
  getShopOwners,
  getDustbinHistory,
  increaseActiveUserCount,
  increaseActiveShopCount,
  submitBottleData,
  getAllBottles,
  getAllShopOwners,
  updateCoinsCount,
  updateShopCoinsCount,
  getShopOwnerData,
  findMostUsedDustbinAndShopUsername,
  findMostUsedDustbinAndUserWithMaxDisposeCount,
};
