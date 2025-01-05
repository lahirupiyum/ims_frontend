import { Box } from "@mui/material";
import { useState } from "react";
import ContainedButton from "../../../../components/buttons/ContainedButton";
import DeleteDialog from "../../../../components/delete-dialog";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import {
  fontSizes,
  fontWeights,
} from "../../../../components/typography/CustomTypography";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { customerDeleteAction } from "../../../../redux/slices/customer/customer/delete";
import { customerPageAction } from "../../../../redux/slices/customer/customer/page";
import { CustomerResponse } from "../../../../types/customer/Customer";
import CreateUpdateForm from "./CreateUpdateForm";

const columns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 50 },
  { id: "priority", label: "Priority", minWidth: 50 },
  { id: "address", label: "Address", minWidth: 80 },
  { id: "contactNo", label: "Contact No", minWidth: 50 },
  { id: "email", label: "Email", minWidth: 50 },
  { id: "accountManager", label: "Account Manager", minWidth: 50 },
  { id: "vsnl", label: "VSNL ID", minWidth: 50 },
  { id: "asNumber", label: "AS Number", minWidth: 50 },
];

const Customer = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerResponse | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<number>(-1);

  const dispatch = useAppDispatch();
  const customerPageState = useAppSelector((state) => state.customer.page);

  const handleFormOpen = () => setIsFormOpen(true);

  const handleFormClose = () => {
    setSelectedCustomer(null);
    setSelectedIndex(-1);
    setIsFormOpen(false);
  };

  const handleEdit = (customer: CustomerResponse, index: number) => {
    setSelectedCustomer(customer);
    setSelectedIndex(index);
    handleFormOpen();
  };

  const openDeleteDialog = (id: number) => {
    setSelectedIdToDelete(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteOpen(false);
    setSelectedIdToDelete(-1);
  };

  const deleteFunction = () => {
    dispatch(customerDeleteAction(selectedIdToDelete));
  };

  const rowsFormatter = (rows: CustomerResponse[]) =>
    rows.map((row, index) => {
      const {
        id,
        name,
        priority,
        address,
        contactNo,
        email,
        accountManager,
        vsnlId: vsnl,
        asNumber,
      } = row;

      return {
        actions: wrapActionButtons([
          actionButton(
            ActionIcontype.edit,
            () => {
              handleEdit(row, index);
            },
            1
          ),
          actionButton(
            ActionIcontype.delete,
            () => {
              openDeleteDialog(id);
            },
            2
          ),
        ]),
        name,
        priority,
        address,
        contactNo,
        email,
        accountManager: accountManager.name,
        vsnl,
        asNumber,
      };
    });

  return (
    <>
      <Box p={2} display="flex" justifyContent="end" alignItems="center">
        <ContainedButton
          onClick={handleFormOpen}
          sx={{
            fontSize: fontSizes.xs,
            bgcolor: "white",
            color: "black",
            fontWeight: fontWeights.lg,
          }}
        >
          New Customer
        </ContainedButton>
      </Box>
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={customerPageState}
        pageAction={customerPageAction}
      />
      <CreateUpdateForm
        open={isFormOpen}
        handleClose={handleFormClose}
        index={selectedIndex}
        selectedCustomer={selectedCustomer}
      />
      <DeleteDialog
        name="Customer"
        deleteFunction={deleteFunction}
        handleClose={closeDeleteDialog}
        open={isDeleteOpen}
      />
    </>
  );
};

export default Customer;
