import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppSelector } from "../../../../redux/hooks";
import { NetworkDeviceResponse } from "../../../../types/NetworkDevice";
import { networkDevicePageAction } from "../../../../redux/slices/network/device/page";

const column: Column[] = [
  { id: "action", label: "Action", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 20 },
  { id: "serialNumber", label: "Serial No", minWidth: 100 },
  { id: "quantity", label: "Quantity", minWidth: 100 },
  { id: "type", label: "Device Type", minWidth: 100 },
  { id: "manufacturer", label: "Device Manufacturer", minWidth: 100 },
  { id: "model", label: "Device Model", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "branch", label: "Branch", minWidth: 100 },
  { id: "vendor", label: "Vendor", minWidth: 100 },
];

const Devices = () => {
  const networkDevicePageState = useAppSelector(
    (state) => state.networkDevice.page
  );

  const rowsFormatter = (rows: NetworkDeviceResponse[]) =>
    rows.map((row) => ({
      action: wrapActionButtons([
        actionButton(ActionIcontype.edit, () => {}, 1),
        actionButton(ActionIcontype.delete, () => {}, 2),
      ]),
      id: row.id,
      serialNumber: row.serialNumber,
      quantity: row.quantity,
      type: row.type.name,
      manufacturer: row.manufacturer.name,
      model: row.model.name,
      status: row.status.name,
      branch: row.branch.name,
      vendor: row.vendor.name,
    }));
  return (
    <CustomTable
      columns={column}
      rowsFormatter={rowsFormatter}
      pageAction={networkDevicePageAction}
      pageState={networkDevicePageState}
    />
  );
};

export default Devices;
