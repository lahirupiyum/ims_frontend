import { useEffect } from "react";
import TabContainer, { TabElement } from "../../../../components/tab";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import DropdownButton, { MenuElement } from "../../../../components/buttons/DropdownButton";

const NetworkAssets = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/inventory/asset/network") navigate("devices");
  });

  const tabs: TabElement[] = [
    {
      label: "Network Devices",
      contextPath: getContextPath("devices"),
    },
    {
      label: "Manufacturers",
      contextPath: getContextPath("manufacturers"),
    },
    {
      label: "Types",
      contextPath: getContextPath("types"),
    },
    {
      label: "Models",
      contextPath: getContextPath("models"),
    },
  ];

  const menuElements: MenuElement[] = [
    {label: "Device", onClick:() => {}},
    {label: "Type", onClick:() => {}},
    {label: "Manufacturer", onClick:() => {}},
    {label: "Model", onClick:() => {}},
  ]

  return (
    <div style={{ width: "100%" }}>
      <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
        <TabContainer elements={tabs} />
        <DropdownButton name="new" elements={menuElements} />
      </Box>
      <Outlet />
    </div>
  );
};

const getContextPath = (name: string) => {
  return "/inventory/asset/network/" + name;
};

export default NetworkAssets;
