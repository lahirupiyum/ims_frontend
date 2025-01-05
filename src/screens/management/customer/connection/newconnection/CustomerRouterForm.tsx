import { Box } from "@mui/material";
import AutoCompleteFormField from "../../../../../components/textFields/AutoCompleteField";
import FormField from "../../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { networkRouterSearchAction } from "../../../../../redux/slices/inventory/networkAssets/router";
import { CusRouterRequest } from "../../../../../types/customer/CusRouter";

type Proptypes = {
  customerRouterForm: CusRouterRequest,
  setCustomerRouterForm: React.Dispatch<React.SetStateAction<CusRouterRequest>>
}

const CustomerRouterForm = ({customerRouterForm, setCustomerRouterForm}: Proptypes) => {
  const dispatch = useAppDispatch();
  const { data: networkRouterList } = useAppSelector(
    (state) => state.networkAssets.router
  );

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
        label="Bandwidth (in Mbps)"
        name="bandwidth"
        value={customerRouterForm?.bandwidth || ""}
        onChange={handleChange}
      />
      <Box sx={{ display: "flex", gap: "20px" }}>
        <FormField
          label="LAN Port"
          name="lanPort"
          value={customerRouterForm?.lanPort || ""}
          onChange={handleChange}
        />
        <FormField
          label="LAN IP Pool"
          name="lanIpPool"
          value={customerRouterForm?.lanIpPool || ""}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <FormField
          label="WAN Port"
          name="wanPort"
          value={customerRouterForm?.wanPort || ""}
          onChange={handleChange}
        />
        <FormField
          label="WAN IP Pool"
          name="wanIpPool"
          value={customerRouterForm?.wanIpPool || ""}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default CustomerRouterForm;
