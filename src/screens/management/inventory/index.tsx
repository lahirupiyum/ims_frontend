import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { inventoryChildren } from "../../../route/routes";
import Sidenav from "../../sidenav/Sidenav";
import Dashboard from "./Dashboard";
import Header from "./Header";

const Inventory = () => {
  const navigate = useNavigate();
  console.log(inventoryChildren.dashboard.path);
  useEffect(() => {
    navigate(inventoryChildren.dashboard.path as string);
  }, []);
  return (
    <Box sx={{ bgcolor: "#f8f4f4", height: "100vh" }}>
      <Box sx={{ pl: "225px" }}>
        <Header />
        <Dashboard />
      </Box>
      <Sidenav />
    </Box>
  );
};

export default Inventory;
