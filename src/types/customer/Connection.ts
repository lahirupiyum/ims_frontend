import { CusRouterRespone } from "./CusRouter";
import { CustomerResponse } from "./Customer";
import {
  LastMileConnectionRequest,
  LastMileConnectionResponse,
} from "./LastMileConnection";
import { PERouterResponse } from "./PERouter";

export enum NetworkServiceType {
  ILL,
  MPLS,
}

export enum ManageStatus {
  MANAGEABLE,
  UNMANAGEABLE,
}

export type FirewallCredentials = {
  username: string;
  password: string;
};

interface Connection {
  dsp: Date;
  serviceChange: Date;
  terminationDate: Date;
  networkServiceType: NetworkServiceType;
  manageStatus: ManageStatus | null;
  firewallCredentials: FirewallCredentials;
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
  peRouter: PERouterResponse;
  cusRouter: CusRouterRespone;
  activeStatus: boolean;
}
