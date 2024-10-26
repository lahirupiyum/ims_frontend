import { Box } from "@mui/material";
import { useEffect, useState } from "react";
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
import FormHandler, { FormTypes } from "./create-update-form/FormHandler";

const NetworkAssets = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedFormType, setSelectedFormType] = useState<FormTypes | null>(null)
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

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
  
  const handleCloseDropDown = () => {
    setOpenDropDown(false);
  }

  const handleOpenForm = (type: FormTypes) => {
    setSelectedFormType(type);
    handleCloseDropDown();
  };

  const handleCloseForm = () => {
    setSelectedFormType(null)
  }

  const menuElements: MenuElement[] = [
    { label: "Device", onClick: () => {handleOpenForm(FormTypes.device)} },
    { label: "Type", onClick: () => {handleOpenForm(FormTypes.type)} },
    { label: "Manufacturer", onClick: () => {handleOpenForm(FormTypes.manufacturer)} },
    { label: "Model", onClick: () => {handleOpenForm(FormTypes.model)} },
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
        <DropdownButton name="new" elements={menuElements} isOpen={openDropDown} setIsOpen={setOpenDropDown} />
      </Box>
      <Outlet />
      <FormHandler formType={selectedFormType} handleClose={handleCloseForm} />
    </div>
  );
};

export default NetworkAssets;
