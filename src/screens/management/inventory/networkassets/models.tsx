import { useState } from "react";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { useAppSelector } from "../../../../redux/hooks";
import { modelPageAction } from "../../../../redux/slices/network/model/page";
import { NetworkDeviceModelResponse } from "../../../../types/NetworkDeviceModel";
import NetworkDeviceModelForm from "./create-update-form/model";

const columns: Column[] = [
  { id: "action", label: "Action", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 50 },
];

const Models = () => {
  const [openUpdateModel, setOpenUpdateModel] = useState<boolean>(false);
  const [selectedDeviceModel, setSelectedDeviceModel] = useState<NetworkDeviceModelResponse | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleOpenUpdateModel = (data: NetworkDeviceModelResponse, index: number) => {
    setSelectedDeviceModel(data);
    setSelectedIndex(index);
    setOpenUpdateModel(true);
  }

  const handleCloseUpdateModel = () => {
    setSelectedDeviceModel(null);
    setSelectedIndex(-1);
    setOpenUpdateModel(false);
  }

  const modelPageState = useAppSelector(
    (state) => state.networkDeviceModel.page
  );

  const rowsFormatter = (rows: NetworkDeviceModelResponse[]) =>
    rows.map(({ id, name }, index) => ({
      action: wrapActionButtons([
        actionButton(ActionIcontype.edit, () => {handleOpenUpdateModel({id, name}, index)}, 1),
        actionButton(ActionIcontype.delete, () => {}, 2),
      ]),
      id,
      name,
    }));

  return (
    <>
      <CustomTable
      columns={columns}
      pageState={modelPageState}
      pageAction={modelPageAction}
      rowsFormatter={rowsFormatter}
    />
    <NetworkDeviceModelForm
      handleClose={handleCloseUpdateModel}
      open={openUpdateModel}
      index={selectedIndex}
      selectedModel={selectedDeviceModel}
    />
    </>
  );
};

export default Models;
