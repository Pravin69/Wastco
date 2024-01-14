import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import { useSelector } from "react-redux";
import userService from "../../services/user.service";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./DataGrid.css";
import PopupChart from "../../components/PopupChart/PopupChart";
import { Box, IconButton } from "@mui/material";
import { InsertChartOutlined as GraphIcon } from "@mui/icons-material";


const DataGrid = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user
  const [showPopup, setShowPopup] = useState(false); // Track the visibility of the popup
  const { user } = useSelector((state) => state.auth);

  const columns = useMemo(
    () => [
      {
        accessorKey: "userid",
        header: "User Id",
      },
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "bottleDisposeCount",
        header: "Bottle Disposed",
      },
      {
        accessorKey: "coinsCount",
        header: "Coins Earned",
      },
    ],
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    []
  );

  useEffect(() => {
    if (user && user.roles.includes("Admin")) {
      userService
        .getAllUsers()
        .then((response) => {
          const allUsers = response.data;
          setUsers(allUsers);
        })
        .catch((error) => {
          console.error("Failed to fetch users:", error);
        });
    }
  }, [user]);

  // Handle row click and set the selected user
  const handleRowClick = (row) => {
    // console.log(row.original);
    const selectedUser = row.original;
    setSelectedUser(selectedUser);
    setShowPopup(true);
  };

  // Close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container">
      <span>Active Users</span>
      <div className="table-container">
        <ThemeProvider theme={theme}>
          <MaterialReactTable
            columns={columns}
            data={users}
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
            )}
          />
        </ThemeProvider>
      </div>

      {/* Render the popup if showPopup is true */}
      {showPopup && (
        <PopupChart user={selectedUser} onClose={handleClosePopup}>
          {/* Render the StatisticsChart component with the selected user */}
          {/* <StatisticsChart user={selectedUser} /> */}
        </PopupChart>
      )}
    </div>
  );
};

export default DataGrid;
