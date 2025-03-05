import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import PopupDialog from "../../../../../components/popup-dialog";
import FormField from "../../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { updateFirewallCredentialsView } from "../../../../../redux/slices/customer/connection/view";
import {
  fcUpdateAction,
  fcUpdateReset,
} from "../../../../../redux/slices/customer/router-firewall-credentials/update";
import {
  FirewallCredentialsRequest,
  FirewallCredentialsResponse,
} from "../../../../../types/customer/Connection";

type PropTypes = {
  firewallCredentials: FirewallCredentialsResponse;
  handleClose: () => void;
  open: boolean;
};

const FirewallCredentialsUpdateForm = ({
  firewallCredentials,
  handleClose,
  open,
}: PropTypes) => {
  const [firewallCredentialsForm, setFirewallCredentialsForm] =
    useState<FirewallCredentialsRequest>({
      username: firewallCredentials.username,
      password: firewallCredentials.password,
    });

  const dispatch = useAppDispatch();
  const { loading: updateLoading, data: updatedData } = useAppSelector(
    (state) => state.firewallCredentials.update
  );

  useEffect(() => {
    if (updatedData) {
      dispatch(updateFirewallCredentialsView(updatedData));
      dispatch(fcUpdateReset());
      handleClose();
    }
  }, [updatedData, dispatch, handleClose]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFirewallCredentialsForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(fcUpdateAction(firewallCredentials.id, firewallCredentialsForm));
  };

  return (
    <PopupDialog
      title="Update Firewall Credentials"
      open={open}
      handleClose={handleClose}
      onClick={handleSubmit}
      loading={updateLoading}
      width={600}
    >
      <Box display="flex" flexDirection="column" gap="20px">
        <FormField
          label="Username"
          name="username"
          value={firewallCredentialsForm.username}
          onChange={handleChange}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          value={firewallCredentialsForm.password}
          onChange={handleChange}
        />
      </Box>
    </PopupDialog>
  );
};

export default FirewallCredentialsUpdateForm;
