import CustomTable, { Column } from "../../../../components/table";
import { useAppSelector } from "../../../../redux/hooks";
import { manufacturerPageAction } from "../../../../redux/slices/network/manufacturer/page";

const Manufacturers = () => {
  const columns: Column[] = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 50 },
  ];
  const manufacturerPageState = useAppSelector(
    (state) => state.networkDeviceManufacturer.page
  );

  const rowsFormatter = (device: any[]) => {
    return [];
  };

  return (
    <CustomTable
      columns={columns}
      pageAction={manufacturerPageAction}
      pageState={manufacturerPageState}
      rowsFormatter={rowsFormatter}
    />
  );
};

export default Manufacturers;
