import React, { useEffect, useState } from "react";
import css from "./Dashboard.module.css";
import { cardsData, groupNumber } from "../../data";
import Statistics from "../../components/Statistics/Statistics";
import Orders from "../../components/Orders/Orders";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../../services/user.service";
import { updateAuth } from "../../actions/auth";
import userService from "../../services/user.service"; 

const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState("1 week");

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [mostUsedDustbin, setMostUsedDustbin] = useState("");

  useEffect(() => {
    fetchMostUsedDustbin();
  }, []);

  useEffect(() => {
    // Fetch the user data and set the coinsCount
    userService
      .getUserData()
      .then((response) => {
        const userData = response.data.user;
        dispatch(updateAuth(userData));
        
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        
        // Handle the error appropriately (e.g., show an error message)
      });
  }, []);


  const fetchMostUsedDustbin = async () => {
    try {
      // console.log(currentUser)
      const response = await UserService.getMostUsedDustbin(currentUser.userid);
      console.log(response.data);
      setMostUsedDustbin(response.data.shopOwnerName);
    } catch (error) {
      console.log("Error fetching most used dustbin:", error);
    }
  };

  return (
    <div className={css.container}>
      {/* Left Side */}
      <div className={css.dashboard}>
        <div className={`${css.dashboardHead} theme-container`}>
          <div className={css.head}>
            <span>Dashboard</span>

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
                  <span>{currentUser.bottleDisposed || currentUser.bottleDisposeCount}</span>
                </div>
              </div>
              <div className={css.card}>
                <div className={css.cardHead}>
                  <span>Total Coins Earned</span>
                  <span>+1</span>
                </div>

                <div className={css.cardAmount}>
                  <span>{currentUser.coinsEarned|| currentUser.coinsCount}</span>
                </div>
              </div>
              <div className={css.card}>
                <div className={css.cardHead}>
                  <span>Most used Dustbin</span>
                  <span>+1</span>
                </div>

                <div className={css.cardAmount}>
                  <span>{mostUsedDustbin}</span>
                </div>
              </div>
              
          </div>
        </div>

        <Statistics user={currentUser.user} timePeriod={timePeriod} />
      </div>

      <Orders />
    </div>
  );
};

export default Dashboard;
