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

export enum ProvisioningStatus {
  PROVISIONED = "Provisioned",
  UNDER_PROVISION = "Under Provision"
}

export type FirewallCredentialsRequest = {
  ip: string;
  port: string;
};

export type FirewallCredentialsResponse = {
  id: number;
  ip: string;
  port: string;
};
interface Connection {
  dsp: number | null;
  serviceChange: number | null;
  terminationDate: number | null;
  networkServiceType: NetworkServiceType;
  provisioningStatus: ProvisioningStatus;
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
