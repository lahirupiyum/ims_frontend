import { Box, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import PopupDialog from "../../../../../components/popup-dialog";
import AutoCompleteFormField from "../../../../../components/textFields/AutoCompleteField";
import FormField from "../../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { updateConnectionView } from "../../../../../redux/slices/customer/connection/view";
import {
  customerListAction,
  customerSearchAction,
} from "../../../../../redux/slices/customer/customer/list";

import {
  connectionUpdateAction,
  connectionUpdateReset,
} from "../../../../../redux/slices/customer/connection/update";
import {
  ConnectionRequest,
  ConnectionResponse,
  ManageStatus,
  NetworkServiceType,
} from "../../../../../types/customer/Connection";
import { getDate } from "../utils";

type PropTypes = {
  connection: ConnectionResponse;
  handleClose: () => void;
  open: boolean;
  type: "remark" | "connection";
};

const ConnectionUpdateForm = ({
  connection,
  handleClose,
  open,
  type,
}: PropTypes) => {
  const [connectionForm, setConnectionForm] = useState<ConnectionRequest>({
    cusRouterId: connection.cusRouter.id,
    customerId: connection.customer.id,
    dsp: connection.dsp,
    firewallCredentials: connection.firewallCredentials,
    lastMileConnection: connection.lastMileConnection,
    manageStatus: connection.manageStatus,
    networkServiceType: connection.networkServiceType,
    peRouterId: connection.peRouter.id,
    remarks: connection.remarks,
    serviceChange: connection.serviceChange,
    terminationDate: connection.terminationDate,
  });

  const dispatch = useAppDispatch();
  const { data: customerList } = useAppSelector((state) => state.customer.list);
  const { loading: updateLoading, data: updatedData } = useAppSelector(
    (state) => state.connection.update
  );

  useEffect(() => {
    dispatch(customerListAction());
  }, []);

  useEffect(() => {
    if (updatedData) {
      dispatch(updateConnectionView(updatedData));
      dispatch(connectionUpdateReset());
      handleClose();
    }
  }, [updatedData, dispatch, handleClose]);

  useEffect(() => {
    if (connectionForm.networkServiceType === NetworkServiceType.ILL)
      setConnectionForm((prev) => ({
        ...prev,
        manageStatus: ManageStatus.MANAGEABLE,
      }));
  }, [connectionForm.networkServiceType]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (["dsp", "serviceChange"].includes(name))
      setConnectionForm((prev) => ({
        ...prev,
        [name]: new Date(value).getTime(),
      }));
    else setConnectionForm((prev) => ({ ...prev, [name]: value }));
  };

  const searchCustomers = (name: string) => {
    dispatch(customerSearchAction(name));
  };

  const handleSubmit = () => {
    dispatch(connectionUpdateAction(connection.id, connectionForm));
  };

  return (
    <PopupDialog
      title={type === "remark" ? "Update Remarks" : "Update Connection"}
      open={open}
      handleClose={handleClose}
      onClick={handleSubmit}
      loading={updateLoading}
      width={600}
    >
      {type === "connection" ? (
        <Box display="flex" flexDirection="column" gap="20px">
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
            optionLabel={(option) => option.name}
            onInputChange={(_, value) => searchCustomers(value)}
            onChange={(_, value) =>
              setConnectionForm((prev) => ({
                ...prev,
                customerId: value?.id || 0,
              }))
            }
            value={
              customerList.find(
                (customer) => customer.id === connectionForm.customerId
              ) || null
            }
          />
          <FormField
            type="date"
            label="DSP"
            name="dsp"
            value={getDate(connectionForm.dsp)}
            onChange={handleChange}
          />
          <FormField
            type="date"
            label="Service Change"
            name="serviceChange"
            value={getDate(connectionForm.serviceChange)}
            onChange={handleChange}
          />
          {connectionForm.networkServiceType === NetworkServiceType.MPLS && (
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
        </Box>
      ) : (
        <FormField
          label="Remarks"
          name="remarks"
          multiline
          rows={4}
          value={connectionForm.remarks}
          onChange={handleChange}
        />
      )}
    </PopupDialog>
  );
};

export default ConnectionUpdateForm;
