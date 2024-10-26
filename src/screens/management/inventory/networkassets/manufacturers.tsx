import { useState } from "react";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppSelector } from "../../../../redux/hooks";
import { manufacturerPageAction } from "../../../../redux/slices/network/manufacturer/page";
import { NetworkDeviceManufacturerResponse } from "../../../../types/NetworkDeviceManufacturer";
import NetowrkDeviceManufacturerForm from "./create-update-form/manufacturer";

type ManufacturerType = {
  id: number;
  name: string;
};

const Manufacturers = () => {
  const columns: Column[] = [
    { id: "action", label: "Action", minWidth: 50 },
    { id: "id", label: "ID", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 50 },
  ];

  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState<boolean>(false);
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<NetworkDeviceManufacturerResponse | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleOpenUpdateForm = (
    manufacturer: NetworkDeviceManufacturerResponse,
    index: number
  ) => {
    setSelectedManufacturer(manufacturer);
    setSelectedIndex(index);
    setIsOpenUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setSelectedManufacturer(null);
    setSelectedIndex(-1);
    setIsOpenUpdateForm(false);
  };

  const manufacturerPageState = useAppSelector(
    (state) => state.networkDeviceManufacturer.page
  );

  const deleteManufacturer = (id: number) => {
    console.log(`The Id: ${id} of manufacturer about to be deleted!`);
  };

  const rowsFormatter = (manufacturers: ManufacturerType[]) =>
    manufacturers.map((manufacturer, index) => ({
      action: wrapActionButtons([
        actionButton(
          ActionIcontype.edit,
          () => {
            handleOpenUpdateForm(manufacturer, index);
          },
          1
        ),
        actionButton(
          ActionIcontype.delete,
          () => {
            deleteManufacturer(manufacturer.id);
          },
          2
        ),
      ]),
      id: manufacturer.id,
      name: manufacturer.name,
    }));

  return (
    <>
      <CustomTable
        columns={columns}
        pageAction={manufacturerPageAction}
        pageState={manufacturerPageState}
        rowsFormatter={rowsFormatter}
      />
      <NetowrkDeviceManufacturerForm
        handleClose={handleCloseUpdateForm}
        selectedManufacturer={selectedManufacturer}
        index={selectedIndex}
        open={isOpenUpdateForm}
      />
    </>
  );
};

export default Manufacturers;
