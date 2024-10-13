import { Box } from "@mui/material";
import { useState } from "react";
import ContainedButton from "../../../../components/buttons/ContainedButton";
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
import { useAppSelector } from "../../../../redux/hooks";
import { vendorPageAction } from "../../../../redux/slices/vendor/page";
import { VendorResponse } from "../../../../types/Vendor";
import CreateUpdateForm from "./CreateUpdateForm";

const columns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 20 },
  { id: "name", label: "Name", minWidth: 50 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "contactNo", label: "Contact Number", minWidth: 100 },
];

const Vendor = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedVendor, setSelectedVendor] = useState<VendorResponse | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  
  const vendorPageState = useAppSelector((state) => state.vendor.page);

  const handleFormOpen = () => setIsFormOpen(true);
  const handleFormClose = () => {
    setSelectedVendor(null);
    setSelectedIndex(-1);
    setIsFormOpen(false);
  };

  const handleEdit = (vendor: VendorResponse, index:number) => {
    setSelectedVendor(vendor);
    setSelectedIndex(index);
    handleFormOpen();
  }

  const rowsFormatter = (rows: VendorResponse[]) =>
    rows.map(({ id, name, email, contactNo }, index) => ({
      actions: wrapActionButtons([
        actionButton(ActionIcontype.edit, () => {handleEdit({ id, name, email, contactNo }, index)}, 1),
        actionButton(ActionIcontype.delete, () => {}, 2),
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
    </>
  );
};

export default Vendor;
