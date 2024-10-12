import CustomTable, {
    actionButton,
    ActionIcontype,
    Column,
    wrapActionButtons,
} from "../../../../components/table";
import { useAppSelector } from "../../../../redux/hooks";
import { branchPageAction } from "../../../../redux/slices/branch/page";
import { BranchResponse } from "../../../../types/Branch";

const columns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 20 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "address", label: "Address", minWidth: 200 },
];

const Branch = () => {
  const branchPageState = useAppSelector((state) => state.branch.page);

  const rowsFormatter = (rows: BranchResponse[]) =>
    rows.map(({ id, name, address }) => ({
      actions: wrapActionButtons([
        actionButton(ActionIcontype.edit, () => {}, 1),
        actionButton(ActionIcontype.delete, () => {}, 2),
      ]),
      id,
      name,
      address,
    }));

  return (
    <CustomTable
      columns={columns}
      rowsFormatter={rowsFormatter}
      pageState={branchPageState}
      pageAction={branchPageAction}
    />
  );
};

export default Branch;
