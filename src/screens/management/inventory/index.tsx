import { Box } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { inventoryRoutes } from "../../../route/config/inventory/inventoryRoutes";
import Sidenav from "../../sidenav/Sidenav";
import Header from "./Header";

const Inventory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(inventoryRoutes.dashboard.path);
  useEffect(() => {
    if(location.pathname==="inventory") navigate(inventoryRoutes.dashboard.path as string);
  }, []);
  return (
    <Box sx={{ bgcolor: "#f8f4f4", height: "100vh" }}>
      <Box sx={{ ml: "250px" }}>
        <Header />
        <Outlet />
      </Box>
      <Sidenav />
    </Box>
  );
};

export default Inventory;
