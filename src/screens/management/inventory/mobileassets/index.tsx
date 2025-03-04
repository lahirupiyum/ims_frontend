import { useState } from "react";
import DeleteDialog from "../../../../components/delete-dialog";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { mobileAssetDeleteAction } from "../../../../redux/slices/inventory/mobileAssets/delete";
import { mobileAssetPageAction } from "../../../../redux/slices/inventory/mobileAssets/page";
import { MobileAssetResponse } from "../../../../types/Inventory/asset/ModileAssets";
import CreateUpdateForm from "./CreateUpdateForm";
import ContainedButton from "../../../../components/buttons/ContainedButton";
import { Box } from "@mui/material";
import { fontSizes, fontWeights } from "../../../../components/typography/CustomTypography";

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
  { id: "invoiceNumber", label: "Invoice Number", minWidth: 50 },
  {
    id: "assignedTo",
    label: "Assigned To (Employee Name)",
    minWidth: 50,
  },
  { id: "warrantyExpireDate", label: "Warranty Expire Date", minWidth: 50 },
  { id: "purchaseDate", label: "Purchase Date", minWidth: 50 },
];

const MobileAssets = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selecteIdToDelete, setSelectedIdToDelete] = useState<number>(-1);

  const mobileAssetPageState = useAppSelector(
    (state) => state.mobileAssets.page
  );

  const dispatch = useAppDispatch();

  const openDeleteDialog = (id: number) => {
    setSelectedIdToDelete(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteOpen(false);
    setSelectedIdToDelete(-1);
  };

  const deleteFunction = () => {
    dispatch(mobileAssetDeleteAction(selecteIdToDelete));
    closeDeleteDialog();
  };

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [selectedMobileAsset, setSelectedMobileAsset] = useState<MobileAssetResponse | null>(null);
    const [selectedIndexToEdit, setSelectedIndexToEdit] = useState<number>(-1);

    const handleFormOpen = () => {
      setIsFormOpen(true);
    };

    const handleEdit = (asset: MobileAssetResponse, index: number) => {
      setSelectedMobileAsset(asset);
      setSelectedIndexToEdit(index);
      handleFormOpen();
    };

    const handleFormClose = () => {
      setSelectedMobileAsset(null);
      setSelectedIndexToEdit(-1);
      setIsFormOpen(false);
    };

    const rowsFormatter = (rows: MobileAssetResponse[]) =>
      rows.map((row, index) => {
        const { vendor, location, manufacturer, model, type, status, purchaseDate, employee, warrantyExpireDate } = row;

        return {
          actions: wrapActionButtons([
            actionButton(
              ActionIcontype.edit,
              () => {
                handleEdit(row, index);
              },
              1
            ),
            actionButton(
              ActionIcontype.delete,
              () => {
                openDeleteDialog(row.id);
              },
              2
            ),
          ]),
          ...row,
          manufacturer: manufacturer.name,
          vendor: vendor.name,
          location: location.name,
          model: model.name,
          status: status.name,
          type: type.name,
          assignedTo: employee.name,
          purchaseDate: new Date(purchaseDate).toISOString().substring(0, 10),
          warrantyExpireDate: new Date(warrantyExpireDate).toISOString().substring(0, 10),
        };
      });

    return (
      <>
        <Box p={2} display="flex" justifyContent="end" alignItems="center">
          <ContainedButton
            onClick={handleFormOpen}
            sx={{
              color: "black",
              bgcolor: "white",
              fontWeight: fontWeights.lg,
              fontSize: fontSizes.xs,
            }}
          >
            New Mobile Asset
          </ContainedButton>
        </Box>
        <CustomTable
          columns={columns}
          rowsFormatter={rowsFormatter}
          pageState={mobileAssetPageState}
          pageAction={mobileAssetPageAction}
        />
        <DeleteDialog
          name="Mobile Assets"
          deleteFunction={deleteFunction}
          handleClose={closeDeleteDialog}
          open={isDeleteOpen}
        />
        <CreateUpdateForm
          open={isFormOpen}
          handleClose={handleFormClose}
          index={selectedIndexToEdit}
          selectedMobileAsset={selectedMobileAsset}
        />
      </>
    );
};

export default MobileAssets;
