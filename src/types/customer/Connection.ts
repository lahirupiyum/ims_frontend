import { CusRouterResponse } from "./CusRouter";
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

export type FirewallCredentialsRequest = {
  username: string;
  password: string;
};

export type FirewallCredentialsResponse = {
  id: number;
  username: string;
  password: string;
};
interface Connection {
  dsp: number | null;
  serviceChange: number | null;
  terminationDate: number | null;
  networkServiceType: NetworkServiceType;
  manageStatus: ManageStatus;
  remarks: string;
}

export interface ConnectionRequest extends Connection {
  lastMileConnection: LastMileConnectionRequest;
  customerId: number;
  peRouterId: number;
  cusRouterId: number;
  firewallCredentials: FirewallCredentialsRequest ;
}

export interface ConnectionResponse extends Connection {
  id: number;
  lastMileConnection: LastMileConnectionResponse;
  customer: CustomerResponse;
  peRouter: PEConnectionResponse;
  cusRouter: CusRouterResponse;
  activeStatus: boolean;
  firewallCredentials: FirewallCredentialsResponse ;
}
