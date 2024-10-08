import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppSelector } from "../../../../redux/hooks";
import { modelPageAction } from "../../../../redux/slices/network/model/page";
import { NetworkDeviceModelResponse } from "../../../../types/NetworkDeviceModel";

const columns: Column[] = [
  { id: "action", label: "Action", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 50 },
];

const Models = () => {
  const modelPageState = useAppSelector(
    (state) => state.networkDeviceModel.page
  );

  const rowsFormatter = (rows: NetworkDeviceModelResponse[]) =>
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
      columns={columns}
      pageState={modelPageState}
      pageAction={modelPageAction}
      rowsFormatter={rowsFormatter}
    />
  );
};

export default Models;
