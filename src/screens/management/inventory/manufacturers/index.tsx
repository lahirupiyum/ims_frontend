import CustomTable, { Column } from "../../../../components/table";

import { useAppSelector } from "../../../../redux/hooks";
import { manufacturerpageAction } from "../../../../redux/slices/inventory/manufacturer/page";
import { Manufacturer } from "../../../../types/Inventory/Manufacturer";

const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 20 },
  { id: "name", label: "Name", minWidth: 50 },
];

const Manufacturers = () => {
  const manufacturerPageState = useAppSelector(
    (state) => state.manufacturer.page
  );

  const rowsFormatter = (rows: Manufacturer[]) =>
    rows.map(({ id, name }) => ({
      id,
      name,
    }));

  return (
    <>
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={manufacturerPageState}
        pageAction={manufacturerpageAction}
      />
    </>
  );
};

export default Manufacturers;
