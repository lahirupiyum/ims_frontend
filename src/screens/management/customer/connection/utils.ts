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
    activeStatus,
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
    status: activeStatus ? "Active" : "Terminated",
    circuitId,
    customerName,
    customerEmail,
    dsp: dsp?.substring(0,10),
    serviceChange: serviceChange?.substring(0,10),
    terminationDate: terminationDate?.substring(0,10),
    cusRouter: cusRouter.asset.serialNumber,
    peRouter: peRouter.peRouter.serialNumber,
    location: peRouter.peRouter.location.name,
    remarks,
  };
};
