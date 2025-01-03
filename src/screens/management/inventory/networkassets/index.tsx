import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DropdownButton, {
  MenuElement,
} from "../../../../components/buttons/DropdownButton";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import FormHandler, { FormTypes } from "./create-update-form/FormHandler";
import { useAppDispatch } from "../../../../redux/hooks";
import { NetworkAssetResponse } from "../../../../types/Inventory/asset/NetworkAssets";
import { useAppSelector } from "../../../../redux/hooks";
import { networkAssetPageAction } from "../../../../redux/slices/networkAssets/page";
import { networkAssetDeleteAction } from "../../../../redux/slices/networkAssets/delete";
import DeleteDialog from "../../../../components/delete-dialog";

const columns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "assetNumber", label: "Asset Number", minWidth: 50 },
  { id: "serialNumber", label: "Serial Number", minWidth: 50 },
  { id: "manufacturer", label: "Manufacturer", minWidth: 50 },
  { id: "vendor", label: "Vendor", minWidth: 50 },
  { id: "location", label: "Location", minWidth: 50 },
  { id: "model", label: "Model", minWidth: 50 },
  { id: "type", label: "Type", minWidth: 50 },
  { id: "status", label: "Status", minWidth: 50 },
];

const NetworkAssets = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedFormType, setSelectedFormType] = useState<FormTypes | null>(null)
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selecteIdToDelete, setSelectedIdToDelete] = useState<number>(-1);

  const networkAssetPageState = useAppSelector((state) => state.networkAssets.page);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname === "/inventory/asset/network") navigate("devices");
  });

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

  const openDeleteDialog = (id: number) => {
    setSelectedIdToDelete(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteOpen(false);
    setSelectedIdToDelete(-1);
  };

  const deleteFunction = () => {
    dispatch(networkAssetDeleteAction(selecteIdToDelete));
    closeDeleteDialog();
  };

  const rowsFormatter = (rows: NetworkAssetResponse[]) =>
    rows.map(({ id, assetNumber,serialNumber,manufacturer, vendor,location,model,type,status}, index) => ({
      actions: wrapActionButtons([
        actionButton(
          ActionIcontype.edit,
          () => {
            // handleEdit({ id, name, email, contactNo }, index);
          },
          1
        ),
        actionButton(
          ActionIcontype.delete,
          () => {
            openDeleteDialog(id);
          },
          2
        ),
      ]),
      id,
      assetNumber,
      serialNumber,
      manufacturer, 
      vendor,
      location,
      model,
      type,
      status
    }));

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
        <DropdownButton name="new" elements={menuElements} isOpen={openDropDown} setIsOpen={setOpenDropDown} />
      </Box>
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={networkAssetPageState}
        pageAction={networkAssetPageAction}
      />
      <Outlet />
      <FormHandler formType={selectedFormType} handleClose={handleCloseForm} />
      <DeleteDialog
        name="Network Assets"
        deleteFunction={deleteFunction}
        handleClose={closeDeleteDialog}
        open={isDeleteOpen}
      />
    </div>
  );
};

export default NetworkAssets;
