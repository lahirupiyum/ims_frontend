import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import PopupDialog from "../../../../../components/popup-dialog";
import AutoCompleteFormField from "../../../../../components/textFields/AutoCompleteField";
import FormField from "../../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  peConnectionUpdateAction,
  peConnectionUpdateReset,
} from "../../../../../redux/slices/customer/peconnection/update";
import { peRouterListAction } from "../../../../../redux/slices/inventory/networkAssets/list";
import { networkSwitchSearchAction, networkSwtichListAction } from "../../../../../redux/slices/inventory/networkAssets/switch";
import {
  PEConnectionRequest,
  PEConnectionResponse,
} from "../../../../../types/customer/PERouter";
import { updatePEConnectionView } from "../../../../../redux/slices/customer/connection/view";

type PropTypes = {
  peConnection: PEConnectionResponse;
  handleClose: () => void;
  open: boolean;
};

const PEConnectionUpdateForm = ({
  peConnection,
  handleClose,
  open,
}: PropTypes) => {
  const [peConnectionForm, setPEConnectionForm] = useState<PEConnectionRequest>(
    {
      ip: peConnection.ip,
      networkSwitchId: peConnection.networkSwitch.id,
      peRouterId: peConnection.peRouter.id,
      peInterface: peConnection.peInterface,
      switchPort: peConnection.switchPort,
      wanIpPool: peConnection.wanIpPool,
    }
  );

  const dispatch = useAppDispatch();
  const { data: peRoutersList } = useAppSelector(
    (state) => state.networkAssets.list
  );
  const { data: networkSwitchList } = useAppSelector(
    (state) => state.networkAssets.switch
  );
  const { loading: updateLoading, data: updatedData } = useAppSelector(
    (state) => state.peConnection.update
  );

  useEffect(() => {
    dispatch(peRouterListAction());
    dispatch(networkSwtichListAction())
  }, [dispatch]);

  useEffect(() => {
    if (updatedData) {
      handleClose();
      dispatch(peConnectionUpdateReset());
      dispatch(updatePEConnectionView(updatedData))
    }
  }, [updatedData, handleClose, dispatch]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPEConnectionForm((prev) => ({ ...prev, [name]: value }));
  };

  const searchNetworkSwitches = (serialNumber: string) => {
    dispatch(networkSwitchSearchAction(serialNumber));
  };

  const handleSubmit = () => {
    dispatch(peConnectionUpdateAction(peConnection.id, peConnectionForm));
  };

  return (
    <PopupDialog
      open={open}
      handleClose={handleClose}
      loading={updateLoading}
      onClick={handleSubmit}
      title="Update Provider Edge Connection"
      width={600}
    >
      <Box display="flex" flexDirection="column" gap="20px">
        <Box display="flex" gap="20px">
            <FormField
              label="IP Address"
              name="ip"
              value={peConnectionForm.ip}
              onChange={handleChange}
            />
            <FormField
              label="PE Interface"
              name="peInterface"
              value={peConnectionForm.peInterface}
              onChange={handleChange}
            />
        </Box>
        <Box display="flex" gap="20px">
            <FormField
              label="Switch Port"
              name="switchPort"
              value={peConnectionForm.switchPort}
              onChange={handleChange}
            />
            <FormField
              label="WAN IP Pool"
              name="wanIpPool"
              value={peConnectionForm.wanIpPool}
              onChange={handleChange}
            />
        </Box>
        <Box display="flex" gap="20px">
            <AutoCompleteFormField
              label="Network Switch"
              options={networkSwitchList}
              optionLabel={(option) => option.serialNumber}
              onInputChange={(_, value) => searchNetworkSwitches(value)}
              onChange={(_, value) =>
                setPEConnectionForm((prev) => ({
                  ...prev,
                  networkSwitchId: value?.id || 0,
                }))
              }
              value={
                networkSwitchList.find(
                  (networkSwitch) =>
                    networkSwitch.id === peConnectionForm.networkSwitchId
                ) || null
              }
            />
            <AutoCompleteFormField
              label="PE Router"
              options={peRoutersList}
              optionLabel={(option) => option.serialNumber}
              onChange={(_, value) =>
                setPEConnectionForm((prev) => ({
                  ...prev,
                  peRouterId: value?.id || 0,
                }))
              }
              value={
                peRoutersList.find(
                  (peRouter) => peRouter.id === peConnectionForm.peRouterId
                ) || null
              }
            />
        </Box>
      </Box>
    </PopupDialog>
  );
};

export default PEConnectionUpdateForm;
