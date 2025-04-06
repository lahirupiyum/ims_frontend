import {
  Column
} from "../../../../components/table";
import { ConnectionResponse } from "../../../../types/customer/Connection";

export const commonConnectionColumns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "status", label: "Active Status", minWidth: 50 },
  { id: "vsnlId", label: "VSNL ID", minWidth: 50 },
  { id: "bandwidth", label: "Bandwidth", minWidth: 50 },
  { id: "peRouter", label: "PE Router", minWidth: 50 },
  { id: "peInterface", label: "PE Router Interface", minWidth: 50 },
  { id: "peRouterIp", label: "PE Router IP", minWidth: 50 },
  { id: "wanIpAddress", label: "Customer Router IP", minWidth: 50 },
  { id: "circuitId", label: "Circuit ID", minWidth: 50 },
];

export const formatCommonRow = (row: ConnectionResponse) => {
  const {
    lastMileConnection,
    activeStatus,
    customer,
    cusRouter,
    peRouter,
  } = row;
  const { circuitId } = lastMileConnection;
  const { vsnlId } = customer;
  const { ip: peRouterIp, peRouter: peRouterAsset, peInterface, } = peRouter;
  const { wanIpAddress, bandwidth } = cusRouter;

  return {
    status: activeStatus ? "Active" : "Terminated",
    vsnlId,
    bandwidth,
    peRouter: peRouterAsset.serialNumber,
    peInterface,
    peRouterIp,
    wanIpAddress,
    circuitId
  };
};

export const getDate = (date: number | string | null) => date ? new Date(date).toISOString().substring(0,10) : "-"
