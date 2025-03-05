import { Box, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import AutoCompleteFormField from "../../../../../components/textFields/AutoCompleteField";
import FormField from "../../../../../components/textFields/FormField";
import CustomTypography, {
  fontWeights,
} from "../../../../../components/typography/CustomTypography";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { customerSearchAction } from "../../../../../redux/slices/customer/customer/list";
import {
  ConnectionRequest,
  ManageStatus,
  NetworkServiceType,
} from "../../../../../types/customer/Connection";
import { getDate } from "../utils";

type PropTypes = {
  connectionForm: ConnectionRequest;
  setConnectionForm: React.Dispatch<React.SetStateAction<ConnectionRequest>>;
};

const ConnectionForm = ({ connectionForm, setConnectionForm }: PropTypes) => {
  const dispatch = useAppDispatch();
  const { data: customerList } = useAppSelector((state) => state.customer.list);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setConnectionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFirewallCredentials = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setConnectionForm((prev) => ({
      ...prev,
      firewallCredentials: { ...prev.firewallCredentials, [name]: value },
    }));
  };

  const searchCustomers = (name: string) => {
    dispatch(customerSearchAction(name));
  };

  useEffect(() => {
      if (connectionForm.networkServiceType === NetworkServiceType.ILL)
        setConnectionForm(prev => ({...prev, manageStatus: ManageStatus.MANAGEABLE}));
  },[connectionForm.networkServiceType])

  return (
    <Box display="flex" flexDirection="column" gap="20px">
      <Box display="flex" gap="20px">
        <FormField
          label="Service Type"
          name="networkServiceType"
          onChange={handleChange}
          value={connectionForm.networkServiceType}
          select
        >
          {Object.values(NetworkServiceType).map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </FormField>
        <AutoCompleteFormField
          label="Customer"
          options={customerList}
          optionLabel={(option) => `${option?.name} - ${option?.email}`}
          onChange={(_, value) =>
            setConnectionForm((prev) => ({
              ...prev,
              customerId: value?.id || 0,
            }))
          }
          value={customerList.find(
            (customer) => connectionForm.customerId === customer.id
          )}
          onInputChange={(_, value) => {
            searchCustomers(value);
          }}
        />
      </Box>
      <FormField
        label="Date of Provisioning"
        value={getDate(connectionForm.dsp)}
        name="dsp"
        onChange={handleChange}
        type="date"
      />
      {connectionForm.networkServiceType === NetworkServiceType.ILL ? (
        <Box
          border="1px solid lightgray"
          borderRadius={3}
          paddingBottom="20px"
          paddingTop="10px"
          paddingX="10px"
        >
          <CustomTypography fontWeight={fontWeights.xl} ml={1} mb={1}>
            Firewall Credentials
          </CustomTypography>
          <Box display="flex" gap="20px">
            <FormField
              label="Username"
              value={connectionForm.firewallCredentials.username}
              name="username"
              onChange={handleFirewallCredentials}
            />
            <FormField
              label="Password"
              value={connectionForm.firewallCredentials.password}
              name="password"
              onChange={handleFirewallCredentials}
              type="password"
            />
          </Box>
        </Box>
      ) : (
        <FormField
          label="Manage Status"
          name="manageStatus"
          onChange={handleChange}
          value={connectionForm.manageStatus}
          select
        >
          {Object.values(ManageStatus).map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </FormField>
      )}
      <FormField
        label="Remarks"
        value={connectionForm.remarks}
        name="remarks"
        onChange={handleChange}
        multiline
        rows={3}
      />
    </Box>
  );
};

export default ConnectionForm;
