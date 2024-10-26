import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PopupDialog from "../../../../../components/popup-dialog";
import FormField from "../../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  networkDeviceTypeCreateAction,
  networkDeviceTypeCreateReset,
} from "../../../../../redux/slices/network/type/create";
import {
  networkDeviceTypeUpdateAction,
  networkDeviceTypeUpdateReset,
} from "../../../../../redux/slices/network/type/update";
import {
  NetowrkDeviceTypeRequest,
  NetworkDeviceTypeResponse,
} from "../../../../../types/NetworkDeviceType";

type PropTypes = {
  open: boolean;
  handleClose: () => void;
  selectedType: NetworkDeviceTypeResponse | null;
  index: number;
};

const NetowrkDeviceTypeForm = ({
  open,
  handleClose,
  selectedType,
  index,
}: PropTypes) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [typeForm, setTypeForm] = useState<NetowrkDeviceTypeRequest>({
    name: "",
  });

  const dispatch = useAppDispatch();

  const { data: createdData, loading: createLoading } = useAppSelector(
    (state) => state.networkDeviceType.create
  );
  const { data: updatedData, loading: updateLoading } = useAppSelector(
    (state) => state.networkDeviceType.update
  );

  useEffect(() => {
    if (selectedType) {
      setTypeForm({ name: selectedType.name });
      setEditMode(true);
    }
  }, [selectedType]);

  useEffect(() => {
    if (!createLoading && createdData) {
      dispatch(networkDeviceTypeCreateReset());
      closeDialog();
    }
  }, [createLoading, createdData]);

  useEffect(() => {
    if (!updateLoading && updatedData) {
      dispatch(networkDeviceTypeUpdateReset());
      closeDialog();
    }
  }, [updateLoading, updatedData]);

  const closeDialog = () => {
    handleClose();
    const timeout = setTimeout(() => {
      setTypeForm({ name: "" });
      if (editMode) dispatch(networkDeviceTypeUpdateReset());
      else dispatch(networkDeviceTypeCreateReset());
      setEditMode(false);
      clearTimeout(timeout);
    }, 200);
  };

  const handleSubmit = () => {
    if (editMode && selectedType)
      dispatch(networkDeviceTypeUpdateAction(selectedType.id, typeForm, index));
    else dispatch(networkDeviceTypeCreateAction(typeForm));
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
        label="Device type name"
        name="name"
        onChange={(event) => {
          setTypeForm({ name: event.target.value });
        }}
        value={typeForm.name}
      />
    </Box>
  );

  return (
    <PopupDialog
      handleClose={closeDialog}
      loading={createLoading || updateLoading}
      open={open}
      width={500}
      title={
        editMode ? "Update device type" : "Create new device type"
      }
      onClick={handleSubmit}
      children={formChildren}
    />
  );
};

export default NetowrkDeviceTypeForm;
