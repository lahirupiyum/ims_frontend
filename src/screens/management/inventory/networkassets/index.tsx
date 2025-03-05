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
import { networkAssetDeleteAction } from "../../../../redux/slices/inventory/networkAssets/delete";
import {
  networkAssetPageAction,
  networkAssetSearchAction,
} from "../../../../redux/slices/inventory/networkAssets/page";
import { resetSearchActionParams, updateSearchActionParams } from "../../../../redux/slices/searchActionSlice";
import { NetworkAssetResponse } from "../../../../types/Inventory/asset/NetworkAssets";
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
];

const NetworkAssets = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selecteIdToDelete, setSelectedIdToDelete] = useState<number>(-1);
  const [selectedNetworkAsset, setSelectedNetworkAsset] =
    useState<NetworkAssetResponse | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const networkAssetPageState = useAppSelector(
    (state) => state.networkAssets.page
  );

  const dispatch = useAppDispatch();

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedIndex(-1);
    setSelectedNetworkAsset(null);
  };

  const handleEdit = (selectedAsset: NetworkAssetResponse, index: number) => {
    setSelectedNetworkAsset(selectedAsset);
    setSelectedIndex(index);
    handleFormOpen();
  };

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

  useEffect(() => {
    dispatch(
      updateSearchActionParams({
        pageAction: networkAssetPageAction,
        searchAction: networkAssetSearchAction,
      })
    );

    return () => {
      dispatch(resetSearchActionParams());
    }
  }, [dispatch]);

  const rowsFormatter = (rows: NetworkAssetResponse[]) =>
    rows.map((row, index) => {
      const {
        id,
        assetNumber,
        serialNumber,
        manufacturer,
        vendor,
        location,
        model,
        type,
        status,
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
              openDeleteDialog(id);
            },
            2
          ),
        ]),
        id,
        assetNumber,
        serialNumber,
        manufacturer: manufacturer.name,
        vendor: vendor.name,
        location: location.name,
        model: model.name,
        type: type.name,
        status: status.name,
      };
    });

  return (
    <div style={{ width: "100%" }}>
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
          New Network Asset
        </ContainedButton>
      </Box>
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={networkAssetPageState}
        pageAction={networkAssetPageAction}
      />
      <DeleteDialog
        name="Network Assets"
        deleteFunction={deleteFunction}
        handleClose={closeDeleteDialog}
        open={isDeleteOpen}
      />
      <CreateUpdateForm
        open={isFormOpen}
        handleClose={handleFormClose}
        index={selectedIndex}
        selectedNetworkAsset={selectedNetworkAsset}
      />
    </div>
  );
};

export default NetworkAssets;
