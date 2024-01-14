import React from "react";
import css from "./Sidebar.module.css";
import { MdLocationOn, MdSpaceDashboard } from "react-icons/md";
import {
  AiFillCalendar,
  AiFillCreditCard,
  AiOutlineTable,
  AiFillShop
} from "react-icons/ai";
import { FaHistory, FaTasks } from "react-icons/fa";


import { NavLink } from "react-router-dom";
import { BsFillBasket3Fill } from "react-icons/bs";

// CgProfile
// FaHistory
// MdDocumentScanner

const Sidebar = ({ userRole }) => {
  return (
    <div className={css.container}>
      <img src="./logo.png" alt="logo" className={css.logo} />

      <div className={css.menu}>
        {/* Admin-specific menu items */}
        {userRole === "Admin" && (
          <>
            {/* Render admin-specific icons and links */}
            {/* ... */}
            <NavLink to="dashboard" className={css.item} title={"Dashboard"}>
              <MdSpaceDashboard size={30} />
            </NavLink>

            <NavLink to="calendar" className={css.item} title="Calendar">
              <AiFillCalendar size={30} />
            </NavLink>

            <NavLink to="users" className={css.item} title="Users">
              <AiOutlineTable size={30} />
            </NavLink>

            <NavLink to="board" className={css.item} title="Trello Board">
              <FaTasks size={30} />
            </NavLink>

            <NavLink to="shop" className={css.item} title="Add Shop">
              <AiFillShop size={30} />
            </NavLink>

            <NavLink to="bottle" className={css.item} title="Add Bottle">
              <BsFillBasket3Fill size={30} />
            </NavLink>
          </>
        )}

        {/* User-specific menu items */}
        {userRole === "User" && (
          <>
            {/* Render user-specific icons and links */}
            {/* ... */}
            <NavLink to="dashboard" className={css.item} title={"Dashboard"}>
              <MdSpaceDashboard size={30} />
            </NavLink>

            <NavLink to="reward" className={css.item} title="Reward">
              <AiFillCreditCard size={30} />
            </NavLink>

            <NavLink to="history" className={css.item} title="RewardHistory">
              <FaHistory size={30} />
            </NavLink>

            <NavLink to="map" className={css.item} title="ShopLoaction">
              <MdLocationOn size={30} />
            </NavLink>

            {/* HiLocationMarker */}
          </>
        )}
         {userRole === "Shopowner" && (
          <>
            {/* Render user-specific icons and links */}
            {/* ... */}
            <NavLink to="shopdashboard" className={css.item} title={"Dashboard"}>
              <MdSpaceDashboard size={30} />
            </NavLink>

            <NavLink to="shoppoints" className={css.item} title="Shop Points">
              <AiFillCreditCard size={30} />
            </NavLink>

            {/* <NavLink to="history" className={css.item} title="RewardHistory">
              <FaHistory size={30} />
            </NavLink> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
