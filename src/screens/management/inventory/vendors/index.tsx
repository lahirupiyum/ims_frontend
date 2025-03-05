import { Box } from "@mui/material";
import { useEffect, useState } from "react";
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
import { vendorDeleteAction } from "../../../../redux/slices/inventory/vendor/delete";
import { vendorPageAction, vendorSearchPageAction } from "../../../../redux/slices/inventory/vendor/page";
import CreateUpdateForm from "./CreateUpdateForm";
import { VendorResponse } from "../../../../types/Inventory/Vendor";
import { resetSearchActionParams, updateSearchActionParams } from "../../../../redux/slices/searchActionSlice";

const columns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 20 },
  { id: "name", label: "Name", minWidth: 50 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "contactNo", label: "Contact Number", minWidth: 100 },
];

const Vendor = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selecteIdToDelete, setSelectedIdToDelete] = useState<number>(-1);

  const [selectedVendor, setSelectedVendor] = useState<VendorResponse | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const vendorPageState = useAppSelector((state) => state.vendor.page);

  const dispatch = useAppDispatch();

  const handleFormOpen = () => setIsFormOpen(true);
  const handleFormClose = () => {
    setSelectedVendor(null);
    setSelectedIndex(-1);
    setIsFormOpen(false);
  };

  const handleEdit = (vendor: VendorResponse, index: number) => {
    setSelectedVendor(vendor);
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
    dispatch(vendorDeleteAction(selecteIdToDelete));
    closeDeleteDialog();
  };

  useEffect(() => {
      dispatch(
        updateSearchActionParams({
          pageAction: vendorPageAction,
          searchAction: vendorSearchPageAction,
        })
      );
  
      return () => {
        dispatch(resetSearchActionParams());
      };
    }, [dispatch]);

  const rowsFormatter = (rows: VendorResponse[]) =>
    rows.map(({ id, name, email, contactNo }, index) => ({
      actions: wrapActionButtons([
        actionButton(
          ActionIcontype.edit,
          () => {
            handleEdit({ id, name, email, contactNo }, index);
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
      id,
      name,
      email,
      contactNo,
    }));

  return (
    <>
      <Box p={2} display="flex" justifyContent="end" alignItems="center">
        <ContainedButton
          onClick={handleFormOpen}
          sx={{
            color: "black",
            bgcolor: "white",
            fontWeight: fontWeights.lg,
            fontSize: fontSizes.xs,
          }}
        >
          New Vendor
        </ContainedButton>
      </Box>
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={vendorPageState}
        pageAction={vendorPageAction}
      />
      <CreateUpdateForm
        open={isFormOpen}
        handleClose={handleFormClose}
        index={selectedIndex}
        selectedVendor={selectedVendor}
      />
      <DeleteDialog
        name="Vendor"
        deleteFunction={deleteFunction}
        handleClose={closeDeleteDialog}
        open={isDeleteOpen}
      />
    </>
  );
};

export default Vendor;
