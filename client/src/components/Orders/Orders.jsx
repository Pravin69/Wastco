import React from "react";
import css from "./Orders.module.css";
import { groupNumber, ordersData } from "../../data";
import OrdersPieChart from "../OrdersPieChart/OrdersPieChart";
import { useSelector } from "react-redux";

const Orders = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  return (
    
    <div className={`${css.container} theme-container`}>
      {/* {console.log(currentUser)} */}
      <div className={`${css.card}`}>
        <div className={css.imgBx}>
        <img src={currentUser?.profile || currentUser?.shopProfile || "//ssl.gstatic.com/accounts/ui/avatar_2x.png"} alt="" />
        </div>
      <div className={css.content}>
        <div className={css.details}>
          <h2>{currentUser?.username || currentUser?.shopUsername} <br /><span>{currentUser.roles[0]}</span></h2>
          <div className={css.data}>
            <h3>Email <br /> <span>{currentUser?.email || currentUser?.shopEmail}</span></h3>
            <h3>Address <br /><span>{currentUser?.address || currentUser?.shopLocation}</span></h3>
            <h3>285 <br /><span>Following</span></h3>
          </div>
        </div>
      </div>
      </div>
     
    </div>
  );
};

export default Orders;
