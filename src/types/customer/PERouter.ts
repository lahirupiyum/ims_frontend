import { NetworkAssetResponse } from "../Inventory/asset/NetworkAssets";

interface PEConnection {
  port: string;
  ip: string;
  wanIpPool: string;
  switchPort: string;
}

export interface PEConnectionRequset extends PEConnection {
  peRouterId: number;
  networkSwitchId: number;
}

export interface PEConnectionResponse extends PEConnection {
  id: number;
  peRouter: NetworkAssetResponse;
  networkSwitch: NetworkAssetResponse;
}
