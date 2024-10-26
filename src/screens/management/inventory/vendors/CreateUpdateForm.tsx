import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PopupDialog from "../../../../components/popup-dialog";
import FormField from "../../../../components/textFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  vendorCreateAction,
  vendorCreateReset,
} from "../../../../redux/slices/vendor/create";
import {
  vendorUpdateAction,
  vendorUpdateReset,
} from "../../../../redux/slices/vendor/update";
import { VendorRequest, VendorResponse } from "../../../../types/Vendor";

type PropTypes = {
  open: boolean;
  handleClose: () => void;
  selectedVendor: VendorResponse | null;
  index: number;
};

const CreateUpdateForm = ({
  open,
  handleClose,
  selectedVendor,
  index,
}: PropTypes) => {
  const [vendorForm, setVendorForm] = useState<VendorRequest>({
    name: "",
    email: "",
    contactNo: "",
  });
  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();
  const { loading: createLoading, data: createData } = useAppSelector(
    (state) => state.vendor.create
  );
  const { loading: updateLoading, data: updatedData } = useAppSelector(
    (state) => state.vendor.update
  );

  const handleBranchForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setVendorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeDialog = () => {
    handleClose();
    const timeout = setTimeout(() => {
      setVendorForm({ name: "", contactNo: "", email: "" });
      if (editMode) dispatch(vendorUpdateReset());
      else dispatch(vendorCreateReset());
      setEditMode(false);
      clearTimeout(timeout);
    }, 200);
  };

  useEffect(() => {
    if (selectedVendor) {
      const { name, email, contactNo } = selectedVendor;
      setEditMode(true);
      setVendorForm({
        name,
        email,
        contactNo,
      });
    }
  }, [selectedVendor]);

  useEffect(() => {
    if (!createLoading && createData) {
      dispatch(vendorCreateReset());
      closeDialog();
    }
  }, [createLoading, createData]);

  useEffect(() => {
    if (!updateLoading && updatedData) {
      dispatch(vendorUpdateReset());
      closeDialog();
    }
  }, [updateLoading, updatedData]);

  const handleSubmit = () => {
    if (editMode && selectedVendor) {
      dispatch(vendorUpdateAction(selectedVendor.id, vendorForm, index));
    } else dispatch(vendorCreateAction(vendorForm));
  };

  const formChildren = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <FormField
        label="Vendor name"
        name="name"
        onChange={handleBranchForm}
        value={vendorForm.name}
      />
      <FormField
        label="Vendor email"
        name="email"
        onChange={handleBranchForm}
        value={vendorForm.email}
        type="email"
      />
      <FormField
        label="Vendor contact no"
        name="contactNo"
        onChange={handleBranchForm}
        value={vendorForm.contactNo}
      />
    </Box>
  );

  return (
    <PopupDialog
      open={open}
      handleClose={closeDialog}
      children={formChildren}
      title={editMode ? "Update vendor" : "Create new vendor"}
      width={500}
      onClick={handleSubmit}
      loading={createLoading || updateLoading}
    />
  );
};

export default CreateUpdateForm;
