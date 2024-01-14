import React, { useEffect, useState } from "react";
import css from "./ShopDashboard.module.css";
import { cardsData, groupNumber } from "../../data";
import Statistics from "../../components/Statistics/Statistics";
import Orders from "../../components/Orders/Orders";
import { useDispatch, useSelector } from "react-redux";
import ShopStatistics from "../../components/ShopStatistics/ShopStatistics";
import { updateAuth } from "../../actions/auth";
import userService from "../../services/user.service"; // Add this import statement

const ShopDashboard = () => {
  const [timePeriod, setTimePeriod] = useState("1 week");

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the user data and set the coinsCount
    userService
      .getShopOwnerData()
      .then((response) => {
        const shopOwnerData = response.data.shopOwner;
        dispatch(updateAuth(shopOwnerData));
      })
      .catch((error) => {
        console.error("Failed to fetch shop owner data:", error);
        // Handle the error appropriately (e.g., show an error message)
      });
  }, []);

  return (
    <div className={css.container}>
      {/* Left Side */}
      <div className={css.dashboard}>
        <div className={`${css.dashboardHead} theme-container`}>
          <div className={css.head}>
            <span>ShopDashboard</span>

            <div className={css.durationButton}>
              <select value={timePeriod} onChange={handleTimePeriodChange}>
                <option value="1 week">1 week</option>
                <option value="1 month">1 month</option>
                <option value="1 year">1 year</option>
              </select>
            </div>
          </div>
          <div className={css.cards}>
            <div className={css.card}>
              <div className={css.cardHead}>
                <span>Total Bottle Disposed</span>
                <span>+1</span>
              </div>

              <div className={css.cardAmount}>
                <span>{currentUser.dustbinUsed}</span>
              </div>
            </div>
            <div className={css.card}>
              <div className={css.cardHead}>
                <span>Total Coins Earned</span>
                <span>+1</span>
              </div>

              <div className={css.cardAmount}>
                <span>{currentUser.shopCoins}</span>
              </div>
            </div>
            <div className={css.card}>
              <div className={css.cardHead}>
                <span>Total Bottle Stock</span>
                <span>+1</span>
              </div>

              <div className={css.cardAmount}>
                <span>{currentUser.bottlePurchased}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${css.statsContainer} theme-container`}>
          <span className={css.title}>Dustbin Used Statistics</span>
          <ShopStatistics user={currentUser} timePeriod={timePeriod} />
        </div>
      </div>

      <Orders />
    </div>
  );
};

export default ShopDashboard;
