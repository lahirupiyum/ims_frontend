import { Box } from "@mui/material";
import React, { useEffect } from "react";
import CreateableAutoComplete from "../../../../../components/textFields/CreateableAutoComplete";
import FormField from "../../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { lastMileMediaListAction } from "../../../../../redux/slices/customer/lastmile/media/list";
import { lastMileProviderListAction } from "../../../../../redux/slices/customer/lastmile/provider/list";
import { BasicInfo } from "../../../../../types/common/BasicInfo";
import { ConnectionRequest } from "../../../../../types/customer/Connection";

type PropTypes = {
  connectionForm: ConnectionRequest;
  setConnectionForm: React.Dispatch<React.SetStateAction<ConnectionRequest>>;
};

const LAST_MILE_PROVIDER = "lastMileProvider";
const MEDIA = "media";

const LastMileConnectionForm = ({
  connectionForm,
  setConnectionForm,
}: PropTypes) => {
  const lastMileConnectionForm = connectionForm.lastMileConnection;
  const dispatch = useAppDispatch();
  const { data: lastMileMediaList } = useAppSelector(
    (state) => state.lastMileMedia.list
  );
  const { data: lastMileProviderList } = useAppSelector(
    (state) => state.lastMileProvider.list
  );

  useEffect(() => {
    dispatch(lastMileProviderListAction());
    dispatch(lastMileMediaListAction());
  }, [dispatch]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setConnectionForm((prev) => ({
      ...prev,
      lastMileConnection: { ...prev.lastMileConnection, [name]: value },
    }));
  };

  const handleAutoCompleteChange = <T extends BasicInfo>(
    value: T | null,
    field: string
  ) => {
       const id = value?.id || null;
       const name = value?.name || "";

    setConnectionForm((prev) => ({
      ...prev,
      lastMileConnection: {
        ...prev.lastMileConnection,
        [field]: { id, name },
      },
    }));
  };

  const handleNewValueChange = (value: string, type: string) => {
    handleAutoCompleteChange(
      { id: value.length > 0 ? 0 : null, name: value },
      type
    );
  };

  return (
    <Box display="flex" flexDirection="column" gap="20px">
      <Box display="flex" gap="20px">
        <CreateableAutoComplete
          label="Provider"
          value={lastMileConnectionForm.lastMileProvider}
          options={lastMileProviderList}
          optionLabel={(option) => option.name}
          onChange={(_, value) => {
            handleAutoCompleteChange(value, LAST_MILE_PROVIDER);
          }}
          onNewValueChange={(value) => {
            handleNewValueChange(value, LAST_MILE_PROVIDER);
          }}
        />
        <CreateableAutoComplete
          label="Media"
          value={lastMileConnectionForm.media}
          options={lastMileMediaList}
          optionLabel={(option) => option.name}
          onChange={(_, value) => {
            handleAutoCompleteChange(value, MEDIA);
          }}
          onNewValueChange={(value) => {
            handleNewValueChange(value, MEDIA);
          }}
        />
      </Box>
      <FormField
        label="Switch Port"
        name="switchPort"
        value={lastMileConnectionForm.switchPort}
        onChange={handleChange}
      />
      <FormField
        label="Circuit ID"
        name="circuitId"
        value={lastMileConnectionForm.circuitId}
        onChange={handleChange}
      />
      <FormField
        label="Bandwidth (in Mpbs)"
        name="bandwidth"
        value={lastMileConnectionForm.bandwidth}
        onChange={handleChange}
      />
    </Box>
  );
};

export default LastMileConnectionForm;
