import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppSelector } from "../../../../redux/hooks";
import { customerPageAction } from "../../../../redux/slices/customer/customer/page";
import { CustomerResponse } from "../../../../types/customer/Customer";

const columns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 50 },
  { id: "customerPriority", label: "Priority", minWidth: 50 },
  { id: "address", label: "Address", minWidth: 80 },
  { id: "contactNo", label: "Contact No", minWidth: 50 },
  { id: "email", label: "Email", minWidth: 50 },
  { id: "accountManager", label: "Account Manager", minWidth: 50 },
  { id: "vsnl", label: "VSNL ID", minWidth: 50 },
  { id: "asNumber", label: "AS Number", minWidth: 50 },
];

const Customer = () => {

  const customerPageState = useAppSelector(state => state.customer.page);

  const rowsFormatter = (rows: CustomerResponse[]) =>
    rows.map((row, index) => {
      const {
        id,
        name,
        customerPriority,
        address,
        contactNo,
        email,
        accountManager,
        vsnl,
        asNumber,
      } = row;

      return {
        actions: wrapActionButtons([
          actionButton(ActionIcontype.edit, () => {}, 1),
          actionButton(ActionIcontype.delete, () => {}, 2),
        ]),
        name,
        customerPriority,
        address,
        contactNo,
        email,
        accountManager: accountManager.name,
        vsnl,
        asNumber,
      };
    });

  return <>
    {/* <Box p={2} display="flex" justifyContent="end" alignItems="center">
        <ContainedButton
        onClick={handleOpen}
          sx={{
            fontSize: fontSizes.xs,
            bgcolor: "white",
            color: "black",
            fontWeight: fontWeights.lg,
          }}
        >
          New Branch
        </ContainedButton>
      </Box> */}
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={customerPageState}
        pageAction={customerPageAction}
      />
  </>;
};

export default Customer;
