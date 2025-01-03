import React from "react";
import CustomTable, { Column } from "../../../../components/table";

import { Manufacturer } from "../../../../types/Inventory/Manufacturer";
import { useAppSelector } from "../../../../redux/hooks";
import { manufacturerPageAction } from "../../../../redux/slices/network/manufacturer/page";

const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 20 },
  { id: "name", label: "Name", minWidth: 50 },
];

const Manufacturers = () => {
  const manufacturerPageState = useAppSelector(
    (state) => state.networkDeviceManufacturer.page
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
        pageAction={manufacturerPageAction}
      />
    </>
  );
};

export default Manufacturers;
