import { Box, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import PopupDialog from "../../../../../components/popup-dialog";
import AutoCompleteFormField from "../../../../../components/textFields/AutoCompleteField";
import FormField from "../../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { updateCuRouterView } from "../../../../../redux/slices/customer/connection/view";
import {
  cusRouterUpdateAction,
  cusRouterUpdateReset,
} from "../../../../../redux/slices/customer/cusrouter/update";
import { networkRouterAvailableListAction, networkRouterSearchAction } from "../../../../../redux/slices/inventory/networkAssets/router";
import {
  CusRouterRequest,
  CusRouterResponse,
  RouterOwnership,
} from "../../../../../types/customer/CusRouter";
import { NetworkAssetResponse } from "../../../../../types/Inventory/asset/NetworkAssets";

type PropTypes = {
  customerRouter: CusRouterResponse;
  handleClose: () => void;
  open: boolean;
};

const CustomerRouterUpdateForm = ({
  customerRouter,
  handleClose,
  open,
}: PropTypes) => {
  const [customerRouterForm, setCustomerRouterForm] =
    useState<CusRouterRequest>({
      assetId: 0,
      bandwidth: '',
      lanIpPool: "",
      wanIpAddress: "",
      ownership: RouterOwnership.CUSTOMER,
      asNumber: ""
    });

  const [networkOptionList, setNetworkOptionList] = useState<NetworkAssetResponse[]>([]);

  const dispatch = useAppDispatch();
  const  { data: networkRouterList } = useAppSelector(
    (state) => state.networkAssets.router
  );
  const { loading: updateLoading, data: updatedData } = useAppSelector(
    (state) => state.cusRouter.update
  );

  useEffect(() => {
    dispatch(networkRouterAvailableListAction());
  },[dispatch])

  useEffect(() => {
    setCustomerRouterForm({
      assetId: customerRouter.asset.id,
      bandwidth: customerRouter.bandwidth,
      lanIpPool: customerRouter.lanIpPool,
      wanIpAddress: customerRouter.wanIpAddress,
      ownership: customerRouter.ownership,
      asNumber: customerRouter.asNumber
    });
  },[customerRouter])

  useEffect(() => {
    setNetworkOptionList([...networkRouterList, customerRouter.asset]);
  },[networkRouterList])

  useEffect(() => {
    if (updatedData && !updateLoading) {
      handleClose();
      dispatch(updateCuRouterView(updatedData));
      dispatch(cusRouterUpdateReset());
    }
  }, [updatedData, updateLoading, handleClose, dispatch]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCustomerRouterForm((prev) => ({ ...prev, [name]: value }));
  };

  const searchNetworkRouters = (serialNumber: string) => {
    dispatch(networkRouterSearchAction(serialNumber));
  };

  const handleSubmit = () => {
    dispatch(cusRouterUpdateAction(customerRouter.id, customerRouterForm));
  };

  return (
    <PopupDialog
      loading={updateLoading}
      width={600}
      open={open}
      handleClose={handleClose}
      onClick={handleSubmit}
      title="Update Customer Router"
    >
      <Box display="flex" flexDirection="column" gap="20px">
        <AutoCompleteFormField
          label="Network Router"
          options={networkOptionList}
          optionLabel={(option) => option.serialNumber}
          onInputChange={(_, value) => searchNetworkRouters(value)}
          onChange={(_, value) =>
            setCustomerRouterForm((prev) => ({
              ...prev,
              assetId: value?.id || 0,
            }))
          }
          value={
            networkOptionList.find(
              (networkRouter) => networkRouter.id === customerRouterForm.assetId
            ) || null
          }
        />
        <FormField
          label="Bandwidth (in Mbps)"
          name="bandwidth"
          value={customerRouterForm.bandwidth}
          onChange={handleChange}
        />
        <FormField
          label="LAN IP Pool"
          name="lanIpPool"
          value={customerRouterForm.lanIpPool}
          onChange={handleChange}
        />
        <FormField
          label="WAN IP Address"
          name="wanIpAddress"
          value={customerRouterForm.wanIpAddress}
          onChange={handleChange}
        />
        <FormField
          label="AS Number"
          name="asNumber"
          value={customerRouterForm.asNumber}
          onChange={handleChange}
        />
        <FormField 
          label="Ownership"
          name="ownership"
          onChange={handleChange}
          value={customerRouterForm.ownership}
          select
        >
          {Object.values(RouterOwnership).map(value => (
            <MenuItem key={value} value={value} sx={{textTransform:"capitalize"}}>
              {value}
            </MenuItem>
          ))}
        </FormField>
      </Box>
    </PopupDialog>
  );
};

export default CustomerRouterUpdateForm;
