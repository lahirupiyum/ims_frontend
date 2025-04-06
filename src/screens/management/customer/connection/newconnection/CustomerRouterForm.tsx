import { Box, MenuItem } from "@mui/material";
import AutoCompleteFormField from "../../../../../components/textFields/AutoCompleteField";
import FormField from "../../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { networkRouterAvailableListAction, networkRouterSearchAction } from "../../../../../redux/slices/inventory/networkAssets/router";
import { CusRouterRequest, RouterOwnership } from "../../../../../types/customer/CusRouter";
import { useEffect } from "react";

type Proptypes = {
  customerRouterForm: CusRouterRequest,
  setCustomerRouterForm: React.Dispatch<React.SetStateAction<CusRouterRequest>>
}

const CustomerRouterForm = ({customerRouterForm, setCustomerRouterForm}: Proptypes) => {
  const dispatch = useAppDispatch();
  const { data: networkRouterList } = useAppSelector(
    (state) => state.networkAssets.router
  );


  useEffect(() => {
    dispatch(networkRouterAvailableListAction());
  },[])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCustomerRouterForm((prev) => ({ ...prev, [name]: value }));
  };

  const searchNetworkRouters = (serialNumber: string) => {
    dispatch(networkRouterSearchAction(serialNumber));
  };

  return (
    <Box display="flex" flexDirection="column" gap="20px">
      <Box display="flex" gap="20px">
        <AutoCompleteFormField
          label="Network Router"
          options={networkRouterList}
          optionLabel={(option) => option.serialNumber}
          onInputChange={(_, value) => searchNetworkRouters(value)}
          onChange={(_, value) =>
            setCustomerRouterForm((prev) => ({
              ...prev,
              assetId: value?.id || 0,
            }))
          }
          value={
            networkRouterList.find(
              (networkRouter) => networkRouter.id === customerRouterForm.assetId
            ) || null
          }
        />
        <FormField 
          label="Ownership"
          name="ownership"
          onChange={handleChange}
          value={customerRouterForm?.ownership}
          select
        >
          {Object.values(RouterOwnership).map(value => (
            <MenuItem key={value} value={value} sx={{textTransform:"capitalize"}}>
              {value}
            </MenuItem>
          ))}
        </FormField>
      </Box>

      <Box display="flex" gap="20px">
        <FormField
          label="Bandwidth (in Mbps)"
          name="bandwidth"
          value={customerRouterForm?.bandwidth || ""}
          onChange={handleChange}
        />
        <FormField 
          label="As Number"
          name="asNumber"
          value={customerRouterForm?.asNumber || ""}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "20px" }}>
      <FormField
          label="WAN IP Address"
          name="wanIpAddress"
          value={customerRouterForm?.wanIpAddress || ""}
          onChange={handleChange}
        />
        <FormField
          label="LAN IP Pool"
          name="lanIpPool"
          value={customerRouterForm?.lanIpPool || ""}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default CustomerRouterForm;
