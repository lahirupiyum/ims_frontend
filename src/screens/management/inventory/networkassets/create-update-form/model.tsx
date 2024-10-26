import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PopupDialog from "../../../../../components/popup-dialog";
import FormField from "../../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  networkDeviceModelCreateAction,
  networkDeviceModelCreateReset,
} from "../../../../../redux/slices/network/model/create";
import {
  networkDeviceModelUpdateAction,
  networkDeviceModelUpdateReset,
} from "../../../../../redux/slices/network/model/update";
import {
  NetworkDeviceModelRequest,
  NetworkDeviceModelResponse,
} from "../../../../../types/NetworkDeviceModel";

type PropTypes = {
  open: boolean;
  handleClose: () => void;
  selectedModel: NetworkDeviceModelResponse | null;
  index: number;
};

const NetworkDeviceModelForm = ({
  open,
  handleClose,
  selectedModel,
  index,
}: PropTypes) => {
  const [modelForm, setModelForm] = useState<NetworkDeviceModelRequest>({
    name: "",
  });
  const [editMode, setEditMode] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { data: createdData, loading: createLoading } = useAppSelector(
    (state) => state.networkDeviceModel.create
  );
  const { data: updatedData, loading: updateLoading } = useAppSelector(
    (state) => state.networkDeviceModel.update
  );

  useEffect(() => {
    if (selectedModel) {
      setModelForm({ name: selectedModel.name });
      setEditMode(true);
    }
  }, [selectedModel]);

  useEffect(() => {
    if ((createdData && !createLoading) || (updatedData && !updateLoading))
      closeDialog();
  }, [createdData, createLoading, updatedData, updateLoading]);

  const closeDialog = () => {
    handleClose();
    const timeout = setTimeout(() => {
      setModelForm({ name: "" });
      if (editMode) dispatch(networkDeviceModelUpdateReset());
      else dispatch(networkDeviceModelCreateReset());
      setEditMode(false);
      clearTimeout(timeout);
    }, 200);
  };

  const handleSubmit = () => {
    if (editMode && selectedModel)
      dispatch(
        networkDeviceModelUpdateAction(selectedModel.id, modelForm, index)
      );
    else dispatch(networkDeviceModelCreateAction(modelForm));
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
        label="Device model name"
        name="name"
        onChange={(event) => {
          setModelForm({ name: event.target.value });
        }}
        value={modelForm.name}
      />
    </Box>
  );

  return (
    <PopupDialog
      handleClose={closeDialog}
      loading={createLoading || updateLoading}
      open={open}
      width={500}
      title={editMode ? "Update device model" : "Create new device model"}
      onClick={handleSubmit}
      children={formChildren}
    />
  );
};

export default NetworkDeviceModelForm;