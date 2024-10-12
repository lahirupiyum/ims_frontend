import { Box } from "@mui/material";
import { useState } from "react";
import ContainedButton from "../../../../components/buttons/ContainedButton";
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
import { useAppSelector } from "../../../../redux/hooks";
import { branchPageAction } from "../../../../redux/slices/branch/page";
import { BranchResponse } from "../../../../types/Branch";
import CreateForm from "./CreateForm";

const columns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 20 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "address", label: "Address", minWidth: 200 },
];

const Branch = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<BranchResponse | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const branchPageState = useAppSelector((state) => state.branch.page);

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

  const rowsFormatter = (rows: BranchResponse[]) =>
    rows.map(({ id, name, address }, index) => ({
      actions: wrapActionButtons([
        actionButton(ActionIcontype.edit, () => {handleEdit(index, {id, name, address})}, 1),
        actionButton(ActionIcontype.delete, () => {}, 2),
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
      <CreateForm open={open} handleClose={handleClose} selectedBranch={selectedBranch} index={activeIndex} />
    </>
  );
};

export default Branch;
