import { Box } from "@mui/material";
import { useState } from "react";
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
import { branchPageAction } from "../../../../redux/slices/branch/page";
import { BranchResponse } from "../../../../types/Branch";
import CreateUpdateForm from "./CreateUpdateForm";
import { branchDeleteAction } from "../../../../redux/slices/branch/delete";

const columns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 20 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "address", label: "Address", minWidth: 200 },
];

const Branch = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedIdtoDelete, setSelectedIdtoDelete] = useState<number>(-1);
  
  const [open, setOpen] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<BranchResponse | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const dispatch = useAppDispatch();
  const branchPageState = useAppSelector((state) => state.branch.page);

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedIdtoDelete(-1);
  };

  const handleClose = () => {
    setOpen(false)
    if(selectedBranch) setSelectedBranch(null);
    if(activeIndex >= 0) setActiveIndex(-1);
  };
  const handleOpen = () => setOpen(true);
  
  const handleEdit = (index:number, branch: BranchResponse) => {
    setSelectedBranch(branch);
    setActiveIndex(index);
    handleOpen();
  }

  const handleOpenDeleteDialog = (id: number) => {
    setSelectedIdtoDelete(id);
    setOpenDeleteDialog(true);
  }

  const handleDelete = () => {
    dispatch(branchDeleteAction(selectedIdtoDelete));
  }

  const rowsFormatter = (rows: BranchResponse[]) =>
    rows.map(({ id, name, address }, index) => ({
      actions: wrapActionButtons([
        actionButton(ActionIcontype.edit, () => {handleEdit(index, {id, name, address})}, 1),
        actionButton(ActionIcontype.delete, () => {handleOpenDeleteDialog(id)}, 2),
      ]),
      id,
      name,
      address,
    }));

  return (
    <>
      <Box p={2} display="flex" justifyContent="end" alignItems="center">
        <ContainedButton
        onClick={handleOpen}
          sx={{
            fontSize: fontSizes.xs,
            bgcolor: "white",
            color: "black",
            fontWeight: fontWeights.lg,
          }}
        >
          New Branch
        </ContainedButton>
      </Box>
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={branchPageState}
        pageAction={branchPageAction}
      />
      <CreateUpdateForm open={open} handleClose={handleClose} selectedBranch={selectedBranch} index={activeIndex} />
      <DeleteDialog open={openDeleteDialog} handleClose={handleCloseDeleteDialog} name="Branch" deleteFunction={handleDelete} />
    </>
  );
};

export default Branch;
