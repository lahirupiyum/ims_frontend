import { Box } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { customer as customerSidenavAction } from "../../../redux/slices/sidenavSlice";
import { customer, customer_connection } from "../../../utils/context-paths";
import Sidenav from "../../sidenav/Sidenav";
import Header from "../inventory/Header";

const CustomerManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(customerSidenavAction());
    if (location.pathname === customer) navigate(customer_connection);
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

export default CustomerManagement;
