import React, { useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import css from "./AddBottle.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import userService from "../../services/user.service";
import PopupBottle from "../../components/PopupAddBottle/PopupBottle";
import { Box, IconButton } from "@mui/material";
import { InsertChartOutlined as GraphIcon } from "@mui/icons-material";
import PopupShopChart from "../../components/PopUpShopChart/PopupShopChart";

const AddBottle = () => {
  const [bottleData, setbottleData] = useState([]);
  const [showPopup1, setShowPopup1] = useState(false);

  useEffect(() => {
    fetchBottleData();
  }, []);

  const fetchBottleData = () => {
    userService
    .getAllBottles()
    .then((response) => {
      console.log(response);
      setbottleData(response.data);
    })
    .catch((error) => {
      console.error("Failed to fetch bottle data:", error);
    });
  };

  const columns = [
    {
      accessorKey: "bottleId",
      header: "Bottle ID",
    },
    {
      accessorKey: "content",
      header: "Content",
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry Date",
    },
    {
      accessorKey: "shopPurchased",
      header: "Shop Purchased",
    },
    {
      accessorKey: "userPurchased",
      header: "User Purchased",
    },
    {
      accessorKey: "claimStatus",
      header: "Claim Status",
    },
    // Add more columns as needed
  ];
  

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleAddBottle = () => {
    setShowPopup1(true);
  };

  const handleClosePopup1 = () => {
    setShowPopup1(false);
  };


  return (
    <div className={css.container}>
      <div className={css.title}>
        <span>Bottle Data</span>
        <button className={css.button} onClick={handleAddBottle}>Add Bottle</button>
      </div>
      <div className={css.tableContainer}>
        <ThemeProvider theme={theme}>
          <MaterialReactTable columns={columns} data={bottleData} />
        </ThemeProvider>
      </div>

      {showPopup1 && (
        <PopupBottle onClose={handleClosePopup1}>
        {/* Render the StatisticsChart component with the selected user */}
        {/* <StatisticsChart user={selectedUser} /> */}
        </PopupBottle>
      )}
    </div>
  );
};

export default AddBottle;
