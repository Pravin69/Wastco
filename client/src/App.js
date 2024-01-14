import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import BoardAdmin from "./components/BoardAdmin";
import BoardUser from "./components/BoardUser";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import Calendar from "./pages/Calendar/Calendar";
import BoardPage from "./pages/Board/Board";
import DataGrid from "./pages/DataGrid/DataGrid";
import Reward from "./pages/Reward/Reward";
import RewardHistory from "./pages/History/RewardHistory";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AddShop from "./pages/AddShop/AddShop";
import ShopDashboard from "./pages/ShopDashboard/ShopDashboard";
import BoardShop from "./components/BoardShop";
import AddBottle from "./pages/AddBottle/AddBottle";
import Mapbox from "./pages/map/Mapbox";
import ShopPoints from "./pages/ShopReward/ShopPoints";
library.add(fas, far);

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("Admin"));
      document.documentElement.style.fontSize = "medium";
    } else {
      setShowAdminBoard(false);
      document.documentElement.style.fontSize = "62.5%";
    }
  }, [currentUser]);

  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={<BoardAdmin />}>
              <Route index element={<Layout />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<DataGrid />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="board" element={<BoardPage />} />
              <Route path="shop" element={<AddShop />} />
              <Route path="bottle" element={<AddBottle />} />
            </Route>
            <Route path="/shop/*" element={<BoardShop />}>
              <Route index element={<Layout />} />
              <Route path="shopdashboard" element={<ShopDashboard />} />
              <Route path="shoppoints" element={<ShopPoints />} />
              {/* <Route path="history" element={<RewardHistory />} /> */}
            </Route>
            <Route path="/user/*" element={<BoardUser />}>
              <Route index element={<Layout />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="reward" element={<Reward />} />
              <Route path="history" element={<RewardHistory />} />
              <Route path="map" element={<Mapbox />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
export default App;
