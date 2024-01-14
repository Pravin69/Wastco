import React, { useEffect, useState } from "react";
import css from "./Layout.module.css";
import { BiSearch } from "react-icons/bi";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { logout } from "../../actions/auth";
import { useCallback } from "react";

const LayoutContent = ({ currentUser, pathname, logOut }) => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.profile) {
      setProfileImage(currentUser.profile);
    } else {
      setProfileImage("//ssl.gstatic.com/accounts/ui/avatar_2x.png");
    }
  }, [currentUser]);

  return (
    <div className={css.container}>
      {console.log(currentUser)}
      <Sidebar userRole={currentUser?.roles[0]}  />
      {/* making the dashboard as the default route */}
      {pathname === "/" && <Navigate to="/dashboard" />}
      <div className={css.dashboard}>
        <div className={css.topBaseGradients}>
          <div className="gradient-red"></div>
          <div className="gradient-orange"></div>
          <div className="gradient-blue"></div>
        </div>

        <div className={css.header}>
          <span>{moment().format("dddd, Do MMM YYYY")}</span>

          <div className={css.searchBar}>
            <BiSearch size={20} />
            <input type="text" placeholder="Search" />
          </div>

          <div className={css.profile}>
            <div className={css.details}>
              <span>{currentUser?.userid || currentUser.shopid}</span>
              <span>{currentUser?.email || currentUser?.shopEmail}</span>
            </div>
          </div>

          <div className="child:block child:text-[1rem] child:h-11 child:w-[6rem] child:text-center child:py-2 child:text-[#fff] child:bg-sky-900 child:rounded-full child:cursor-pointer child-hover:bg-sky-700">
            <Link to="/login" onClick={logOut}>
              LogOut
            </Link>
          </div>
        </div>
        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Layout = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <LayoutContent
      currentUser={currentUser}
      pathname={pathname}
      logOut={logOut}
    />
  );
};

export default Layout;
