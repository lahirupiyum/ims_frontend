import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PopupDialog from "../../../../components/popup-dialog";
import OutlinedTextField from "../../../../components/textFields/OutlinedTextField";
import { BranchRequest } from "../../../../types/Branch";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { branchCreateAction, branchCreateReset } from "../../../../redux/slices/branch/create";

type PropTypes = {
  open: boolean;
  handleClose: () => void;
};

const NAME = "name";
const ADDRESS = "address";

const CreateForm = ({ open, handleClose }: PropTypes) => {
  const [branchForm, setBranchForm] = useState<BranchRequest>({
    [NAME]: "",
    [ADDRESS]: "",
  });

  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector(state => state.branch.create);

  const handleBranchForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setBranchForm((prev) => ({
      ...prev,
      [name]: value.split("\n").join(" "),
    }));
  };

  useEffect(() => {
    if (!loading && data) {
      dispatch(branchCreateReset());
      handleClose();
    }
    console.log(data);
  },[loading, data]);

  const handleSubmit = () => {
    dispatch(branchCreateAction(branchForm));
  }

  const formChildren = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <OutlinedTextField
        name={NAME}
        fullWidth
        placeholder="Branch name"
        onChange={handleBranchForm}
      />
      <OutlinedTextField
        name={ADDRESS}
        multiline
        fullWidth
        placeholder="Branch Address"
        maxRows={4}
        minRows={2}
        onChange={handleBranchForm}
      />
    </Box>
  );

  return (
    <PopupDialog
      open={open}
      handleClose={handleClose}
      children={formChildren}
      title="Create new branch"
      width={500}
      onClick={handleSubmit}
      loading={loading}
    />
  );
};

export default CreateForm;
