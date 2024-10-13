import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PopupDialog from "../../../../components/popup-dialog";
import FormField from "../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  branchCreateAction,
  branchCreateReset,
} from "../../../../redux/slices/branch/create";
import {
  branchUpdateAction,
  branchUpdateReset,
} from "../../../../redux/slices/branch/update";
import { BranchRequest, BranchResponse } from "../../../../types/Branch";

type PropTypes = {
  open: boolean;
  handleClose: () => void;
  selectedBranch: BranchResponse | null;
  index: number;
};

const NAME = "name";
const ADDRESS = "address";

const CreateUpdateForm = ({
  open,
  handleClose,
  selectedBranch,
  index,
}: PropTypes) => {
  const [branchForm, setBranchForm] = useState<BranchRequest>({
    [NAME]: "",
    [ADDRESS]: "",
  });
  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();
  const { loading: createLoading, data: createData } = useAppSelector(
    (state) => state.branch.create
  );
  const { loading: updateLoading, data: updatedData } = useAppSelector(
    (state) => state.branch.update
  );

  const handleBranchForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setBranchForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (selectedBranch) {
      setEditMode(true);
      setBranchForm({
        name: selectedBranch.name,
        address: selectedBranch.address
          .split(",")
          .map((el) => el.trim())
          .join(",\n"),
      });
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (!createLoading && createData) {
      dispatch(branchCreateReset());
      handleClose();
    }
  }, [createLoading, createData]);

  useEffect(() => {
    if (!updateLoading && updatedData) {
      dispatch(branchUpdateReset());
      handleClose();
    }
  }, [updateLoading, updatedData]);

  const handleSubmit = () => {
    if (editMode && selectedBranch) {
      dispatch(branchUpdateAction(selectedBranch.id, branchForm, index));
    } else dispatch(branchCreateAction(branchForm));
  };

  const closeDialog = () => {
    handleClose();
    const timeout = setTimeout(() => {
      setBranchForm({ name: "", address: "" });
      setEditMode(false);
      clearTimeout(timeout);
    }, 200);
  };

  const formChildren = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <FormField
        label="Branch name"
        name={NAME}
        onChange={handleBranchForm}
        value={branchForm.name}
      />
      <FormField
        label="Branch address"
        name={ADDRESS}
        onChange={handleBranchForm}
        value={branchForm.address}
        minRows={2}
        maxRows={4}
        multiline
      />
    </Box>
  );

  return (
    <PopupDialog
      open={open}
      handleClose={closeDialog}
      children={formChildren}
      title={editMode ? "Update branch" : "Create new branch"}
      width={500}
      onClick={handleSubmit}
      loading={createLoading || updateLoading}
    />
  );
};

export default CreateUpdateForm;
