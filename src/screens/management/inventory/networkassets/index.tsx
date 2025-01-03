import { useState } from "react";
import DeleteDialog from "../../../../components/delete-dialog";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { networkAssetDeleteAction } from "../../../../redux/slices/inventory/networkAssets/delete";
import { networkAssetPageAction } from "../../../../redux/slices/inventory/networkAssets/page";
import { NetworkAssetResponse } from "../../../../types/Inventory/asset/NetworkAssets";

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
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selecteIdToDelete, setSelectedIdToDelete] = useState<number>(-1);

  const networkAssetPageState = useAppSelector((state) => state.networkAssets.page);

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


  return (
    <div style={{ width: "100%" }}>
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
    </div>
  );
};

export default NetworkAssets;
