import { useState } from "react";
import DeleteDialog from "../../../../components/delete-dialog";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { networkDeviceModelDeleteAction } from "../../../../redux/slices/network/model/delete";
import { modelPageAction } from "../../../../redux/slices/network/model/page";
import { NetworkDeviceModelResponse } from "../../../../types/NetworkDeviceModel";
import NetworkDeviceModelForm from "./create-update-form/model";

const columns: Column[] = [
  { id: "action", label: "Action", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 50 },
];

const Models = () => {
  const [openUpdateModel, setOpenUpdateModel] = useState<boolean>(false);
  const [selectedDeviceModel, setSelectedDeviceModel] =
    useState<NetworkDeviceModelResponse | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const [selectedIdToDelete, setSelectedIdToDelete] = useState<number>(-1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleOpenUpdateModel = (
    data: NetworkDeviceModelResponse,
    index: number
  ) => {
    setSelectedDeviceModel(data);
    setSelectedIndex(index);
    setOpenUpdateModel(true);
  };

  const handleCloseUpdateModel = () => {
    setSelectedDeviceModel(null);
    setSelectedIndex(-1);
    setOpenUpdateModel(false);
  };

  const handleDeleteDialogOpen = (id: number) => {
    setIsDeleteDialogOpen(true);
    setSelectedIdToDelete(id);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedIdToDelete(-1);
  };

  const deleteFunction = () => {
    dispatch(networkDeviceModelDeleteAction(selectedIdToDelete));
  };

  const modelPageState = useAppSelector(
    (state) => state.networkDeviceModel.page
  );

  const rowsFormatter = (rows: NetworkDeviceModelResponse[]) =>
    rows.map(({ id, name }, index) => ({
      action: wrapActionButtons([
        actionButton(
          ActionIcontype.edit,
          () => handleOpenUpdateModel({ id, name }, index),
          1
        ),
        actionButton(
          ActionIcontype.delete,
          () => handleDeleteDialogOpen(id),
          2
        ),
      ]),
      id,
      name,
    }));

  return (
    <>
      <CustomTable
        columns={columns}
        pageState={modelPageState}
        pageAction={modelPageAction}
        rowsFormatter={rowsFormatter}
      />
      <NetworkDeviceModelForm
        handleClose={handleCloseUpdateModel}
        open={openUpdateModel}
        index={selectedIndex}
        selectedModel={selectedDeviceModel}
      />
      <DeleteDialog
        deleteFunction={deleteFunction}
        handleClose={handleCloseDeleteDialog}
        name="Network Device Model"
        open={isDeleteDialogOpen}
      />
    </>
  );
};

export default Models;
