import { Box } from "@mui/material";
import AutoCompleteFormField from "../../../../../components/textFields/AutoCompleteField";
import FormField from "../../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { networkSwitchSearchAction } from "../../../../../redux/slices/inventory/networkAssets/switch";
import { PEConnectionRequest } from "../../../../../types/customer/PERouter";
import { useEffect } from "react";
import { peRouterListAction } from "../../../../../redux/slices/inventory/networkAssets/list";

type PropTypes = {
  peConnectionForm: PEConnectionRequest,
  setPEConnectionForm: React.Dispatch<React.SetStateAction<PEConnectionRequest>>
}

const PEConnectionForm = ({peConnectionForm, setPEConnectionForm}: PropTypes) => {

  const dispatch = useAppDispatch();

  const { data: peRoutersList } = useAppSelector(
    (state) => state.networkAssets.list
  );
  const { data: networkSwitchList } = useAppSelector(
    (state) => state.networkAssets.switch
  );

  useEffect(() => {
    dispatch(peRouterListAction());
  },[]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPEConnectionForm((prev) => ({ ...prev, [name]: value }));
  };

  const searchNetworkSwitches = (serialNumber: string) => {
    dispatch(networkSwitchSearchAction(serialNumber));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <FormField
          label="PE IP Address"
          name="ip"
          value={peConnectionForm?.ip || ""}
          onChange={handleChange}
        />
        <FormField
          label="PE Interface"
          name="peInterface"
          value={peConnectionForm?.peInterface || ""}
          onChange={handleChange}
        />
      </Box>
      <FormField
        label="WAN IP Pool"
        name="wanIpPool"
        value={peConnectionForm?.wanIpPool || ""}
        onChange={handleChange}
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
            (router) => router.id === peConnectionForm.peRouterId
          ) || null
        }
      />

      <AutoCompleteFormField
        label="PE Switch"
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
      <FormField
        label="PE Switch Port"
        name="switchPort"
        value={peConnectionForm?.switchPort || ""}
        onChange={handleChange}
      />
    </Box>
  );
};

export default PEConnectionForm;
