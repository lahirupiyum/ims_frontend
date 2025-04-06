import { NetworkAssetResponse } from "../Inventory/asset/NetworkAssets";

interface PEConnection {
  peInterface: string;
  ip: string;
  wanIpPool: string;
  switchPort: string;
}

export interface PEConnectionRequest extends PEConnection {
  peRouterId: number;
  networkSwitchId: number;
}

export interface PEConnectionResponse extends PEConnection {
  id: number;
  peRouter: NetworkAssetResponse;
  networkSwitch: NetworkAssetResponse;
}
