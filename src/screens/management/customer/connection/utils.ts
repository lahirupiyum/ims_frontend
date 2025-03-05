import {
  Column
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
    status: activeStatus ? "Active" : "Terminated",
    circuitId,
    customerName,
    customerEmail,
    dsp: getDate(dsp),
    serviceChange: getDate(serviceChange),
    terminationDate: getDate(terminationDate),
    cusRouter: cusRouter.asset.serialNumber,
    peRouter: peRouter.peRouter.serialNumber,
    location: peRouter.peRouter.location.name,
    remarks: remarks.substring(0,5)+"...",
  };
};

export const getDate = (date: number | string | null) => date ? new Date(date).toISOString().substring(0,10) : "-"
