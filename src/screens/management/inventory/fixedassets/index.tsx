import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ContainedButton from "../../../../components/buttons/ContainedButton";
import DeleteDialog from "../../../../components/delete-dialog";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import {
  fontSizes,
  fontWeights,
} from "../../../../components/typography/CustomTypography";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fixedAssetDeleteAction } from "../../../../redux/slices/inventory/fixedAssets/delete";
import {
  fixedAssetPageAction,
  fixedAssetSearchAction,
} from "../../../../redux/slices/inventory/fixedAssets/page";
import { resetSearchActionParams, updateSearchActionParams } from "../../../../redux/slices/searchActionSlice";
import { FixedAssetResponse } from "../../../../types/Inventory/asset/FixedAssets";
import CreateUpdateForm from "./CreateUpdateForm";

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
  { id: "purchaseDate", label: "Purchase Date", minWidth: 50 },
  { id: "deprecationInfo", label: "Deprecation Info", minWidth: 50 },
];

const FixedAssets = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selecteIdToDelete, setSelectedIdToDelete] = useState<number>(-1);
  const [selectedFixedAsset, setSelectedFixedAsset] =
    useState<FixedAssetResponse | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedIndexToEdit, setSelectedIndexToEdit] = useState<number>(-1);

  const fixedAssetPageState = useAppSelector((state) => state.fixedAssets.page);

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleEdit = (asset: FixedAssetResponse, index: number) => {
    setSelectedFixedAsset(asset);
    setSelectedIndexToEdit(index);
    handleFormOpen();
  };

  const handleFormClose = () => {
    setSelectedFixedAsset(null);
    setSelectedIndexToEdit(-1);
    setIsFormOpen(false);
  };

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
    dispatch(fixedAssetDeleteAction(selecteIdToDelete));
    closeDeleteDialog();
  };

  useEffect(() => {
    dispatch(
      updateSearchActionParams({
        searchAction: fixedAssetSearchAction,
        pageAction: fixedAssetPageAction,
      })
    );

    return () => {
      dispatch(resetSearchActionParams());
    }
  }, [dispatch]);

  const rowsFormatter = (rows: FixedAssetResponse[]) =>
    rows.map((row, index) => {
      const {
        vendor,
        location,
        manufacturer,
        model,
        type,
        status,
        purchaseDate,
      } = row;

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
        purchaseDate: new Date(purchaseDate).toISOString().substring(0, 10),
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
          New Fixed Asset
        </ContainedButton>
      </Box>
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={fixedAssetPageState}
        pageAction={fixedAssetPageAction}
      />
      <DeleteDialog
        name="Fixed Asset"
        deleteFunction={deleteFunction}
        handleClose={closeDeleteDialog}
        open={isDeleteOpen}
      />
      <CreateUpdateForm
        open={isFormOpen}
        handleClose={handleFormClose}
        index={selectedIndexToEdit}
        selectedFixedAsset={selectedFixedAsset}
      />
    </>
  );
};

export default FixedAssets;
