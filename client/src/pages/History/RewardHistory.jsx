import React, { useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import "./RewardHistory.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import userService from "../../services/user.service";

const RewardHistory = () => {
  const [rewardData, setRewardData] = useState([]);

  useEffect(() => {
    fetchRewardData();
  }, []);

  const fetchRewardData = () => {
    userService.getRewardData()
      .then((response) => {
        setRewardData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch reward data:", error);
      });
  };

  const columns = [
    {
      accessorKey: "BottleId",
      header: "Bottle ID",
    },
    {
      accessorKey: "BottleContent",
      header: "Bottle Content",
    },
    {
      accessorKey: "BottleExpiryDate",
      header: "Bottle Expiry Date",
    },
    {
      accessorKey: "DustbinId",
      header: "Dustbin ID",
    },
    {
      accessorKey: "RewardCoin",
      header: "Reward Coin",
    },
    {
        accessorKey: "Timestamp",
        header: "Timestamp",
    },
  ];

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <div className="container">
      <span>Reward History</span>
      <div className="table-container">
        <ThemeProvider theme={theme}>
          <MaterialReactTable columns={columns} data={rewardData} />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default RewardHistory;
