import { Box } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DropdownButton, {
  MenuElement,
} from "../../../../components/buttons/DropdownButton";
import TabContainer, { TabElement } from "../../../../components/tab";
import {
  inventory_network_devices,
  inventory_network_manufacturers,
  inventory_network_models,
  inventory_network_types,
} from "../../../../utils/context-paths";

const NetworkAssets = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/inventory/asset/network") navigate("devices");
  });

  const tabs: TabElement[] = [
    {
      label: "Network Devices",
      contextPath: inventory_network_devices,
    },
    {
      label: "Manufacturers",
      contextPath: inventory_network_manufacturers,
    },
    {
      label: "Device Types",
      contextPath: inventory_network_types,
    },
    {
      label: "Device Models",
      contextPath: inventory_network_models,
    },
  ];

  const menuElements: MenuElement[] = [
    { label: "Device", onClick: () => {} },
    { label: "Type", onClick: () => {} },
    { label: "Manufacturer", onClick: () => {} },
    { label: "Model", onClick: () => {} },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Box
        p={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <TabContainer elements={tabs} />
        <DropdownButton name="new" elements={menuElements} />
      </Box>
      <Outlet />
    </div>
  );
};

export default NetworkAssets;
