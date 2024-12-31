import { Box } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { inventory as inventoryAction } from "../../../redux/slices/sidenavSlice";
import { inventory_mobileassets } from "../../../utils/context-paths";
import Sidenav from "../../sidenav/Sidenav";
import Header from "./Header";

const Inventory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(inventoryAction());
    if (location.pathname === "inventory") navigate(inventory_mobileassets);
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
