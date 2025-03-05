import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import PopupDialog from "../../../../../components/popup-dialog";
import CreateableAutoComplete from "../../../../../components/textFields/CreateableAutoComplete";
import FormField from "../../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { lastMileMediaListAction } from "../../../../../redux/slices/customer/lastmile/media/list";
import { lastMileProviderListAction } from "../../../../../redux/slices/customer/lastmile/provider/list";

import { updateLastMileConnectionView } from "../../../../../redux/slices/customer/connection/view";
import { lastMileConnectionUpdateAction, lastMileConnectionUpdateReset } from "../../../../../redux/slices/customer/lastmile/connection/update";
import { BasicInfo } from "../../../../../types/common/BasicInfo";
import {
  LastMileConnectionRequest,
  LastMileConnectionResponse,
} from "../../../../../types/customer/LastMileConnection";

type PropTypes = {
  lastMileConnection: LastMileConnectionResponse;
  handleClose: () => void;
  open: boolean;
};

const LastMileConnectionUpdateForm = ({
  lastMileConnection,
  handleClose,
  open,
}: PropTypes) => {
  const [lastMileConnectionForm, setLastMileConnectionForm] =
    useState<LastMileConnectionRequest>({
      bandwidth: lastMileConnection.bandwidth,
      circuitId: lastMileConnection.circuitId,
      lastMileProvider: lastMileConnection.lastMileProvider,
      media: lastMileConnection.media,
      switchPort: lastMileConnection.switchPort,
    });

  const dispatch = useAppDispatch();
  const { data: lastMileMediaList } = useAppSelector(
    (state) => state.lastMileMedia.list
  );
  const { data: lastMileProviderList } = useAppSelector(
    (state) => state.lastMileProvider.list
  );
  const { loading: updateLoading, data: updatedData } = useAppSelector(
    (state) => state.lastMileConnection.update
  );

  useEffect(() => {
    dispatch(lastMileProviderListAction());
    dispatch(lastMileMediaListAction());
  }, [dispatch]);

  useEffect(() => {
    if (updatedData) {
      dispatch(updateLastMileConnectionView(updatedData));
      dispatch(lastMileConnectionUpdateReset());
      handleClose();
    }
  }, [updatedData, dispatch, handleClose]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setLastMileConnectionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoCompleteChange = <T extends BasicInfo>(
    value: T | null,
    field: string
  ) => {
    setLastMileConnectionForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(
      lastMileConnectionUpdateAction(
        lastMileConnection.id,
        lastMileConnectionForm
      )
    );
  };

  return (
    <PopupDialog
      title="Update Last Mile Connection"
      open={open}
      handleClose={handleClose}
      onClick={handleSubmit}
      loading={updateLoading}
      width={600}
    >
      <Box display="flex" flexDirection="column" gap="20px">
        <FormField
          label="Bandwidth"
          name="bandwidth"
          value={lastMileConnectionForm.bandwidth}
          onChange={handleChange}
        />
        <FormField
          label="Circuit ID"
          name="circuitId"
          value={lastMileConnectionForm.circuitId}
          onChange={handleChange}
        />
        <CreateableAutoComplete
          optionLabel={(option) => option.name}
          label="Last Mile Provider"
          options={lastMileProviderList}
          value={lastMileConnectionForm.lastMileProvider}
          onChange={(_, value) =>
            handleAutoCompleteChange(value, "lastMileProvider")
          }
          onNewValueChange={(newValue) =>
            handleAutoCompleteChange(
              { id: 0, name: newValue },
              "lastMileProvider"
            )
          }
        />
        <CreateableAutoComplete
          optionLabel={(option) => option.name}
          label="Media"
          options={lastMileMediaList}
          value={lastMileConnectionForm.media}
          onChange={(_, value) => handleAutoCompleteChange(value, "media")}
          onNewValueChange={(newValue) =>
            handleAutoCompleteChange({ id: 0, name: newValue }, "media")
          }
        />
        <FormField
          label="Switch Port"
          name="switchPort"
          value={lastMileConnectionForm.switchPort}
          onChange={handleChange}
        />
      </Box>
    </PopupDialog>
  );
};

export default LastMileConnectionUpdateForm;
