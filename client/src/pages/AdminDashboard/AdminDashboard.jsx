import React, { useEffect, useState } from "react";
import css from "./Admin.module.css";
import { cardsData, groupNumber } from "../../data";
import Statistics from "../../components/Statistics/Statistics";
import Orders from "../../components/Orders/Orders";
import { useSelector } from "react-redux";
import ApiService from "../../services/user.service";
import AdminStatistics from "../../components/AdminStatistics/AdminStatistics";
import userService from "../../services/user.service";

const AdminDashboard = () => {
  const [timePeriod, setTimePeriod] = useState("1 week");
  const [users, setUsers] = useState("user");
  const [activeUsers, setActiveUsers] = useState(0);
  const [activeShops, setActiveShops] = useState(0);

  const [mostUsedDustbin, setMostUsedDustbin] = useState("");
  const [topUser, setTopUser] = useState("")

  useEffect(() => {
    fetchMostUsedDustbinUser();
  }, []);

  const fetchMostUsedDustbinUser = async () => {
    try {
      // console.log(currentUser)
      const response = await userService.getTopShopOwnersTopUsers();
   
      setMostUsedDustbin(response.data.topShopOwners[0].shopUsername);
      setTopUser(response.data.topUsers[0].username);
    } catch (error) {
      console.log("Error fetching most used dustbin:", error);
    }
  };

  const handleYaxisChange = (event) => {
    setUsers(event.target.value);
  }

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch active user count
    ApiService.increaseActiveUserCount()
      .then((response) => {
        setActiveUsers(response.data.activeUsers);
      })
      .catch((error) => {
        console.error("Failed to fetch active user count:", error);
      });

    // Fetch active shop count
    ApiService.increaseActiveShopCount()
      .then((response) => {
        setActiveShops(response.data.activeShops);
      })
      .catch((error) => {
        console.error("Failed to fetch active shop count:", error);
      });
  }, []);

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
                <span>Active Users</span>
                <span>+1</span>
              </div>

              <div className={css.cardAmount}>
                <span>{activeUsers}</span>
              </div>
            </div>
            <div className={css.card}>
              <div className={css.cardHead}>
                <span>Active Shops</span>
                <span>+1</span>
              </div>

              <div className={css.cardAmount}>
                <span>{activeShops}</span>
              </div>
            </div>
            <div className={css.card}>
              <div className={css.cardHead}>
                <span>Top used Shop Dustbin</span>
                <span>+1</span>
              </div>

              <div className={css.cardAmount}>
                <span>{mostUsedDustbin}</span>
              </div>
            </div>
            <div className={css.card}>
              <div className={css.cardHead}>
                <span>Top Bottle Disposer</span>
                <span>+1</span>
              </div>

              <div className={css.cardAmount}>
                <span>{topUser}</span>
              </div>
            </div>
          </div>
        </div>

        {/* <Statistics timePeriod={timePeriod} /> */}
        <div className={`${css.statsContainer} theme-container`}>
          <span className={css.title}>Bottle Disposed Statistics</span>
          <div className={css.filterButton}>
              <select value={users} onChange={handleYaxisChange}>
                <option value="user">User </option>
                <option value="shopowner">Shop Owner</option>
              </select>
            </div>
          <AdminStatistics user={currentUser} yAxis={users} timePeriod={timePeriod} />
        </div>
      </div>

      <Orders />
    </div>
  );
};

export default AdminDashboard;
