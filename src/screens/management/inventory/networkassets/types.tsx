import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppSelector } from "../../../../redux/hooks";
import { typePageAction } from "../../../../redux/slices/network/type/page";
import { NetworkDeviceTypeResponse } from "../../../../types/NetworkDeviceType";

const columns: Column[] = [
  { id: "action", label: "Action", minWidth: 50 },
  { id: "id", label: "Id", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 50 },
];

const Type = () => {
  const deviceTypePageState = useAppSelector(
    (state) => state.networkDeviceType.page
  );
  const rowsFormatter = (rows: NetworkDeviceTypeResponse[]) =>
    rows.map(({ id, name }) => ({
      action: wrapActionButtons([
        actionButton(ActionIcontype.edit, () => {}, 1),
        actionButton(ActionIcontype.delete, () => {}, 2),
      ]),
      id,
      name,
    }));

  return (
    <CustomTable
      pageState={deviceTypePageState}
      pageAction={typePageAction}
      columns={columns}
      rowsFormatter={rowsFormatter}
    />
  );
};

export default Type;
