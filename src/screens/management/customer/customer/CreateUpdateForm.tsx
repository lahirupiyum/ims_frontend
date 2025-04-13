import { Box, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import PopupDialog from "../../../../components/popup-dialog";
import CreateableAutoComplete from "../../../../components/textFields/CreateableAutoComplete";
import FormField from "../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  customerCreateAction,
  customerCreateReset,
} from "../../../../redux/slices/customer/customer/create";
import {
  customerUpdateAction,
  customerUpdateReset,
} from "../../../../redux/slices/customer/customer/update";
import { employeeListAction } from "../../../../redux/slices/inventory/employee/list";
import {
  CustomerPriority,
  CustomerRequest,
  CustomerResponse,
} from "../../../../types/customer/Customer";

type PropTypes = {
  open: boolean;
  handleClose: () => void;
  selectedCustomer: CustomerResponse | null;
  index: number;
};

const initialCustomerForm: CustomerRequest = {
  accountManager: {
    id: null,
    name: "",
  },
  address: "",
  contactNo: "",
  priority: CustomerPriority.BRONZE,
  email: "",
  name: "",
  vsnlId: "",
};

const CreateUpdateForm = ({
  open,
  handleClose,
  selectedCustomer,
  index,
}: PropTypes) => {
  const [customerForm, setCustomerForm] =
    useState<CustomerRequest>(initialCustomerForm);
  const [editMode, setEditMode] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { data: employeeList } = useAppSelector((state) => state.employee.list);
  const { data: createdData, loading: createLoading } = useAppSelector(
    (state) => state.customer.create
  );
  const { data: updatedData, loading: updateLoading } = useAppSelector(
    (state) => state.customer.update
  );

  useEffect(() => {
    dispatch(employeeListAction())
  },[dispatch])

  useEffect(() => {
    if (!selectedCustomer) return;
    setEditMode(true);
    const { id, ...otherValues } = selectedCustomer;
    setCustomerForm(otherValues);
  }, [selectedCustomer]);

  useEffect(() => {
    if ((createdData && !createLoading) || (updatedData && !updateLoading))
      closeDialog();
  }, [createdData, updatedData, createLoading, updateLoading]);

  const closeDialog = () => {
    handleClose();
    const timeout = setTimeout(() => {
      setCustomerForm(initialCustomerForm);
      if (editMode) dispatch(customerUpdateReset());
      else dispatch(customerCreateReset());
      setEditMode(false);
      clearTimeout(timeout);
    }, 200);
  };

  const handleSubmit = () => {
    if (editMode && selectedCustomer)
      dispatch(customerUpdateAction(selectedCustomer.id, customerForm, index));
    else dispatch(customerCreateAction(customerForm));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setCustomerForm((prev) => ({ ...prev, [name]: value }));
  };

  const formChildren = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        <FormField
          label="Name"
          name="name"
          onChange={handleChange}
          value={customerForm.name}
        />
        <FormField
          label="Address"
          name="address"
          onChange={handleChange}
          value={customerForm.address}
        />
      </Box>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        <FormField
          label="Email"
          name="email"
          onChange={handleChange}
          value={customerForm.email}
        />
        <FormField
          label="Contact Number"
          name="contactNo"
          onChange={handleChange}
          value={customerForm.contactNo}
        />
      </Box>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        <FormField
          label="VSNL ID"
          name="vsnlId"
          onChange={handleChange}
          value={customerForm.vsnlId}
        />
      </Box>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        <FormField
          label="Priority"
          name="priority"
          onChange={handleChange}
          value={customerForm.priority}
          select
        >
          {Object.values(CustomerPriority).map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </FormField>
        <CreateableAutoComplete
          label="Account Manager"
          options={employeeList}
          optionLabel={(option) => option.name}
          onChange={(_, value) => {
            setCustomerForm((prev) => ({
              ...prev,
              accountManager: { id: value?.id || 0, name: value?.name || "" },
            }));
          }}
          onNewValueChange={(value) =>
            setCustomerForm((prev) => ({
              ...prev,
              accountManager: { id: 0, name: value },
            }))
          }
          value={customerForm.accountManager}
        />
      </Box>
    </Box>
  );

  return (
    <PopupDialog
      open={open}
      children={formChildren}
      handleClose={closeDialog}
      loading={createLoading || updateLoading}
      onClick={handleSubmit}
      title={editMode ? "Update Customer" : "Create Customer"}
      width={600}
    />
  );
};

export default CreateUpdateForm;
