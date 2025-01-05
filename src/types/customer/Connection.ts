import { CusRouterRespone } from "./CusRouter";
import { CustomerResponse } from "./Customer";
import {
  LastMileConnectionRequest,
  LastMileConnectionResponse,
} from "./LastMileConnection";
import { PEConnectionResponse } from "./PERouter";

export enum NetworkServiceType {
  ILL = "ILL",
  MPLS = "MPLS",
}

export enum ManageStatus {
  MANAGEABLE="Manageable",
  UNMANAGEABLE="Unmanageable",
}

export type FirewallCredentials = {
  username: string;
  password: string;
};

interface Connection {
  dsp: string | null;
  serviceChange: string | null;
  terminationDate: string | null;
  networkServiceType: NetworkServiceType;
  manageStatus: ManageStatus;
  firewallCredentials: FirewallCredentials ;
  remarks: string;
}

export interface ConnectionRequest extends Connection {
  lastMileConnection: LastMileConnectionRequest;
  customerId: number;
  peRouterId: number;
  cusRouterId: number;
}

export interface ConnectionResponse extends Connection {
  lastMileConnection: LastMileConnectionResponse;
  customer: CustomerResponse;
  peRouter: PEConnectionResponse;
  cusRouter: CusRouterRespone;
  activeStatus: boolean;
}
