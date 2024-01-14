import React, { useState } from "react";
import css from "./PopupShopChart.module.css";
import moment from "moment";
import StatisticsChart from "../StatisticsChart/StatisticsChart";
import { IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import ShopStatistics from "../ShopStatistics/ShopStatistics";

const PopupShopChart = ({ user, onClose }) => {
  const [timePeriod, setTimePeriod] = useState("1 week");

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };
  return (
    <div className={`${css.overlay}`}>
      {/* {console.log(user)} */}
      <div className={css.modal}>
        <h2 className={css.title}>Bottle Disposed Statistics</h2>

        <div className={css.closeIcon}>
          <IconButton color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className={css.content}>
          <h3 className={css.subtitle}>{user.username}</h3>
          <div className={css.durationButton}>
            <select value={timePeriod} onChange={handleTimePeriodChange}>
              <option value="1 week">1 week</option>
              <option value="1 month">1 month</option>
              <option value="1 year">1 year</option>
            </select>
          </div>
        </div>
        <ShopStatistics user={user} timePeriod={timePeriod} />
      </div>
    </div>
  );
};

export default PopupShopChart;
