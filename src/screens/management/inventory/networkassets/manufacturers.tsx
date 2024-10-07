import CustomTable, { actionButton, ActionIcontype, Column, wrapActionButtons } from "../../../../components/table";
import { useAppSelector } from "../../../../redux/hooks";
import { manufacturerPageAction } from "../../../../redux/slices/network/manufacturer/page";

type ManufacturerType = {
  id: number,
  name: string
}

const Manufacturers = () => {
  const columns: Column[] = [
    { id: "action", label: "Action", minWidth: 50 },
    { id: "id", label: "ID", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 50 },
  ];
  const manufacturerPageState = useAppSelector(
    (state) => state.networkDeviceManufacturer.page
  );

  const editManufacturer = (manufacturer: ManufacturerType) => {
    console.log(`Manufacturer is about to be edited!`);
  }

  const deleteManufacturer = (id: number) => {
    console.log(`The Id: ${id} of manufacturer about to be deleted!`)
  }

  const rowsFormatter = (manufacturers: ManufacturerType[]) => manufacturers.map(manufacturer => ({
    action: wrapActionButtons([
      actionButton(ActionIcontype.edit, () => { editManufacturer(manufacturer) }, 1),
      actionButton(ActionIcontype.delete, () => { deleteManufacturer(manufacturer.id) }, 2)
    ]),
    id: manufacturer.id,
    name: manufacturer.name
  }))

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
