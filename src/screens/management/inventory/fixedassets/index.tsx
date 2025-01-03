import { useState } from 'react';
import DeleteDialog from "../../../../components/delete-dialog";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fixedAssetDeleteAction } from "../../../../redux/slices/fixedAssets/delete";
import { fixedAssetPageAction } from "../../../../redux/slices/fixedAssets/page";
import { FixedAssetResponse } from "../../../../types/Inventory/asset/FixedAssets";

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

  const fixedAssetPageState = useAppSelector((state) => state.fixedAssets.page);

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

  const rowsFormatter = (rows: FixedAssetResponse[]) =>
    rows.map(({ 
      id, 
      assetNumber, 
      serialNumber,
      manufacturer, 
      vendor,
      location,
      model,
      type,
      status,
      invoiceNumber,
      purchaseDate,
      deprecationInfo,
     }, index) => ({
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
      status,
      invoiceNumber,
      purchaseDate,
      deprecationInfo
    }));

  return (
    <>
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={fixedAssetPageState}
        pageAction={fixedAssetPageAction}
      />
      <DeleteDialog
        name="Fixed Assets"
        deleteFunction={deleteFunction}
        handleClose={closeDeleteDialog}
        open={isDeleteOpen}
      />
    </>
  )
}

export default FixedAssets