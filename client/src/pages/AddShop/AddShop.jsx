import React, { useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import css from "./AddShop.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import userService from "../../services/user.service";
import PopUpAddShop from "../../components/PopUpAddShop/PopUpAddShop";
import { Box, IconButton } from "@mui/material";
import { InsertChartOutlined as GraphIcon } from "@mui/icons-material";
import PopupShopChart from "../../components/PopUpShopChart/PopupShopChart";

const AddShop = () => {
  const [shopOwnerData, setShopOwnerData] = useState([]);
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user


  useEffect(() => {
    fetchRewardData();
  }, []);

  const fetchRewardData = () => {
    userService
      .getShopOwners()
      .then((response) => {
        console.log(response);
        setShopOwnerData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch Shop Owner data:", error);
      });
  };

  const columns = [
    {
      accessorKey: "shopid",
      header: "Shop ID",
    },
    {
      accessorKey: "shopUsername",
      header: "Shop Username",
    },
    {
      accessorKey: "shopEmail",
      header: "Shop Email",
    },
    {
      accessorKey: "shopLocation",
      header: "Shop Location",
    },
    {
      accessorKey: "dustbinId",
      header: "Dustbin ID",
    },
    {
      accessorKey: "dustbinUsed",
      header: "Dustbin Used",
    },
    {
      accessorKey: "shopCoins",
      header: "Shop Coins",
    },
    {
      accessorKey: "bottlePurchased",
      header: "Bottle Purchased",
    },
    // Add more columns as needed
  ];
  

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleAddShopOwner = () => {
    setShowPopup1(true);
  };

  const handleClosePopup1 = () => {
    setShowPopup1(false);
  };

   // Handle row click and set the selected user
   const handleRowClick = (row) => {
    // console.log(row.original);
    const selectedUser = row.original;
    setSelectedUser(selectedUser);
    setShowPopup2(true);
  };

  // Close the popup
  const handleClosePopup2 = () => {
    setShowPopup2(false);
  };

  return (
    <div className={css.container}>
      <div className={css.title}>
        <span>Active ShopOwners</span>
        <button className={css.button} onClick={handleAddShopOwner}>Add Shop Owner</button>
      </div>
      <div className={css.tableContainer}>
        <ThemeProvider theme={theme}>
          <MaterialReactTable columns={columns} data={shopOwnerData}
          enableRowActions
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              <IconButton
                color="primary"
                onClick={() => handleRowClick(row)}
              >
                 <GraphIcon />
              </IconButton>
            </Box>
          )} />
        </ThemeProvider>
      </div>

      {showPopup1 && (
        <PopUpAddShop onClose={handleClosePopup1}>
        {/* Render the StatisticsChart component with the selected user */}
        {/* <StatisticsChart user={selectedUser} /> */}
        </PopUpAddShop>
      )}

       {/* Render the popup if showPopup is true */}
       {showPopup2 && (
        <PopupShopChart user={selectedUser} onClose={handleClosePopup2}>
          {/* Render the StatisticsChart component with the selected user */}
          {/* <StatisticsChart user={selectedUser} /> */}
        </PopupShopChart>
      )}
    </div>
  );
};

export default AddShop;
