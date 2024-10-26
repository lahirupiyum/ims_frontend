import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PopupDialog from "../../../../../components/popup-dialog";
import FormField from "../../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  networkDeviceManufacturerCreateAction,
  networkDeviceManufacturerCreateReset,
} from "../../../../../redux/slices/network/manufacturer/create";
import {
  networkDeviceManufacturerUpdateAction,
  networkDeviceManufacturerUpdateReset,
} from "../../../../../redux/slices/network/manufacturer/update";
import {
  NetworkDeviceManufacturerRequest,
  NetworkDeviceManufacturerResponse,
} from "../../../../../types/NetworkDeviceManufacturer";

type PropTypes = {
  open: boolean;
  handleClose: () => void;
  selectedManufacturer: NetworkDeviceManufacturerResponse | null;
  index: number;
};

const NetowrkDeviceManufacturerForm = ({
  open,
  handleClose,
  selectedManufacturer,
  index,
}: PropTypes) => {
  const [manufacturerForm, setManufacturerForm] =
    useState<NetworkDeviceManufacturerRequest>({
      name: "",
    });
  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();

  const { data: createdData, loading: createLoading } = useAppSelector(
    (state) => state.networkDeviceManufacturer.create
  );
  const { data: updatedData, loading: updateLoading } = useAppSelector(
    (state) => state.networkDeviceManufacturer.update
  );

  useEffect(() => {
    if (selectedManufacturer) {
      setManufacturerForm({
        name: selectedManufacturer.name,
      });
      setEditMode(true);
    }
  }, [selectedManufacturer]);

  useEffect(() => {
    if ((createdData && !createLoading) || (updatedData && !updateLoading))
      closeDialog();
  }, [createdData, createLoading, updatedData, updateLoading]);

  const handleSubmit = () => {
    if (editMode && selectedManufacturer)
      dispatch(
        networkDeviceManufacturerUpdateAction(
          selectedManufacturer.id,
          manufacturerForm,
          index
        )
      );
    else dispatch(networkDeviceManufacturerCreateAction(manufacturerForm));
  };

  const closeDialog = () => {
    handleClose();
    const timeout = setTimeout(() => {
      setManufacturerForm({ name: "" });
      if (editMode) dispatch(networkDeviceManufacturerUpdateReset());
      else dispatch(networkDeviceManufacturerCreateReset());
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
        label="Manufacturer name"
        name="name"
        onChange={(event) => {
          setManufacturerForm({ name: event.target.value });
        }}
        value={manufacturerForm.name}
      />
    </Box>
  );

  return (
    <PopupDialog
      open={open}
      handleClose={closeDialog}
      onClick={handleSubmit}
      loading={createLoading || updateLoading}
      children={formChildren}
      title={editMode ? "Update manufacturer" : "Create new manufacturer" }
      width={580}
    />
  );
};

export default NetowrkDeviceManufacturerForm;
