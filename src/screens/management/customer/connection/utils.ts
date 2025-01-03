import {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";
import { ConnectionResponse } from "../../../../types/customer/Connection";

export const commonConnectionColumns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "status", label: "Active Status", minWidth: 50 },
  { id: "circuitId", label: "Circuit ID", minWidth: 50 },
  { id: "customerName", label: "Customer Name", minWidth: 50 },
  { id: "customerEmail", label: "Customer Email", minWidth: 50 },
  { id: "dsp", label: "DSP", minWidth: 50 },
  { id: "serviceChange", label: "Service Change Date", minWidth: 50 },
  { id: "terminationDate", label: "Termination Date", minWidth: 50 },
  { id: "cusRouter", label: "Customer Router", minWidth: 50 },
  { id: "peRouter", label: "PE Router", minWidth: 50 },
  { id: "location", label: "Location", minWidth: 50 },
  { id: "remarks", label: "Remarks", minWidth: 50 },
];

export const formatCommonRow = (row: ConnectionResponse) => {
  const {
    lastMileConnection,
    activeStatus: status,
    customer,
    dsp,
    serviceChange,
    terminationDate,
    cusRouter,
    peRouter,
    remarks,
  } = row;
  const { circuitId } = lastMileConnection;
  const { name: customerName, email: customerEmail } = customer;

  return {
    actions: wrapActionButtons([
      actionButton(ActionIcontype.edit, () => {}, 1),
    ]),
    status,
    circuitId,
    customerName,
    customerEmail,
    dsp,
    serviceChange,
    terminationDate,
    cusRouter: cusRouter.asset.serialNumber,
    peRouter: peRouter.asset.assetNumber,
    location: peRouter.asset.location.name,
    remarks,
  };
};
