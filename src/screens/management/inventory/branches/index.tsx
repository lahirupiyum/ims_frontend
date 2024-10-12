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

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  const branchPageState = useAppSelector((state) => state.branch.page);

  const rowsFormatter = (rows: BranchResponse[]) =>
    rows.map(({ id, name, address }) => ({
      actions: wrapActionButtons([
        actionButton(ActionIcontype.edit, () => {}, 1),
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
      <CreateForm open={open} handleClose={handleClose} />
    </>
  );
};

export default Branch;
