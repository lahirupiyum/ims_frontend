import { Box } from "@mui/material";
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
import { networkRouterListAction, networkRouterSearchAction } from "../../../../../redux/slices/inventory/networkAssets/router";
import {
  CusRouterRequest,
  CusRouterResponse,
} from "../../../../../types/customer/CusRouter";

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
      assetId: customerRouter.asset.id,
      bandwidth: customerRouter.bandwidth,
      lanPort: customerRouter.lanPort,
      lanIpPool: customerRouter.lanIpPool,
      wanPort: customerRouter.wanPort,
      wanIpPool: customerRouter.wanIpPool,
    });

  const dispatch = useAppDispatch();
  const { data: networkRouterList } = useAppSelector(
    (state) => state.networkAssets.router
  );
  const { loading: updateLoading, data: updatedData } = useAppSelector(
    (state) => state.cusRouter.update
  );

  useEffect(() => {
    dispatch(networkRouterListAction());
  },[dispatch])

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
          value={customerRouterForm.bandwidth}
          onChange={handleChange}
        />
        <FormField
          label="LAN Port"
          name="lanPort"
          value={customerRouterForm.lanPort}
          onChange={handleChange}
        />
        <FormField
          label="LAN IP Pool"
          name="lanIpPool"
          value={customerRouterForm.lanIpPool}
          onChange={handleChange}
        />
        <FormField
          label="WAN Port"
          name="wanPort"
          value={customerRouterForm.wanPort}
          onChange={handleChange}
        />
        <FormField
          label="WAN IP Pool"
          name="wanIpPool"
          value={customerRouterForm.wanIpPool}
          onChange={handleChange}
        />
      </Box>
    </PopupDialog>
  );
};

export default CustomerRouterUpdateForm;
