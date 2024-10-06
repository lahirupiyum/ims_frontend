import CustomTable, {
  Column
} from "../../../../components/table";
import { useAppSelector } from "../../../../redux/hooks";
import { fetchPage } from "../../../../redux/slices/network/device/page";

const Devices = () => {
  const pageState = useAppSelector((state) => state.networkDevicePage);

  const columns: Column[] = [
    { id: "actions", label: "Actions", minWidth: 50 },
    { id: "serialNumber", label: "Serial Number", minWidth: 50 },
    {
      id: "quantity",
      label: "Quantity",
      minWidth: 20,
    },
    {
      id: "type",
      label: "Device Type",
      minWidth: 30,
    },
    {
      id: "model",
      label: "Device Model",
      minWidth: 30,
    },
    {
      id: "status",
      label: "Device Status",
      minWidth: 50,
    },
    {
      id: "branch",
      label: "Branch",
      minWidth: 100,
    },
    {
      id: "vendor",
      label: "Vendor",
      minWidth: 100,
    },
  ];

  const rowsFormatter = (rows: any[]) => rows;

  return (
    <>
      <CustomTable columns={columns} pageState={pageState} pageAction={fetchPage} rowsFormatter={rowsFormatter}  />
    </>
  );
};

export default Devices;
