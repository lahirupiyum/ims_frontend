import { Box } from "@mui/material";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppSelector } from "../../../../redux/hooks";
import { vendorPageAction } from "../../../../redux/slices/vendor/page";
import { VendorResponse } from "../../../../types/Vendor";
import ContainedButton from "../../../../components/buttons/ContainedButton";

const columns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 20 },
  { id: "name", label: "Name", minWidth: 50 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "contactNo", label: "Contact Number", minWidth: 100 },
];

const Vendor = () => {
  const vendorPageState = useAppSelector((state) => state.vendor.page);

  const rowsFormatter = (rows: VendorResponse[]) =>
    rows.map(({ id, name, email, contactNo }) => ({
      actions: wrapActionButtons([
        actionButton(ActionIcontype.edit, () => {}, 1),
        actionButton(ActionIcontype.delete, () => {}, 2),
      ]),
      id,
      name,
      email,
      contactNo,
    }));

  return (
    <>
    <Box display="flex" justifyContent="end" alignItems="center">
      <ContainedButton>New Vendor</ContainedButton>
    </Box>
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={vendorPageState}
        pageAction={vendorPageAction}
      />
    </>
  );
};

export default Vendor;
