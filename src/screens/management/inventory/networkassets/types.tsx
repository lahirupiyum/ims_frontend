import { useState } from "react";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { typePageAction } from "../../../../redux/slices/network/type/page";
import { NetworkDeviceTypeResponse } from "../../../../types/NetworkDeviceType";
import NetowrkDeviceTypeForm from "./create-update-form/type";
import { networkDeviceTypeDeleteAction } from "../../../../redux/slices/network/type/delete";
import DeleteDialog from "../../../../components/delete-dialog";

const columns: Column[] = [
  { id: "action", label: "Action", minWidth: 50 },
  { id: "id", label: "Id", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 50 },
];

const Type = () => {
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
  const [selectedType, setSelectedType] =
    useState<NetworkDeviceTypeResponse | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<number>(-1);

  const dispatch = useAppDispatch();

  const deviceTypePageState = useAppSelector(
    (state) => state.networkDeviceType.page
  );

  const handleUpdate = (type: NetworkDeviceTypeResponse, index: number) => {
    setSelectedType(type);
    setOpenUpdateForm(true);
    setSelectedIndex(index);
  };

  const handleCloseUpdateForm = () => {
    setSelectedType(null);
    setOpenUpdateForm(false);
    setSelectedIndex(-1);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setIsDeleteDialogOpen(true);
    setSelectedIdToDelete(id);
  };

  const hanldeCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedIdToDelete(-1);
  };

  const deleteFunction = () => {
    dispatch(networkDeviceTypeDeleteAction(selectedIdToDelete));
  };


  const rowsFormatter = (rows: NetworkDeviceTypeResponse[]) =>
    rows.map(({ id, name }, index) => ({
      action: wrapActionButtons([
        actionButton(
          ActionIcontype.edit,
          () => {
            handleUpdate({ id, name }, index);
          },
          1
        ),
        actionButton(ActionIcontype.delete, () => handleOpenDeleteDialog(id), 2),
      ]),
      id,
      name,
    }));

  return (
    <>
      <CustomTable
        pageState={deviceTypePageState}
        pageAction={typePageAction}
        columns={columns}
        rowsFormatter={rowsFormatter}
      />
      <NetowrkDeviceTypeForm
        open={openUpdateForm}
        handleClose={handleCloseUpdateForm}
        index={selectedIndex}
        selectedType={selectedType}
      />
       <DeleteDialog
        deleteFunction={deleteFunction}
        handleClose={hanldeCloseDeleteDialog}
        name="Network Device Type"
        open={isDeleteDialogOpen}
      />
    </>
  );
};

export default Type;
