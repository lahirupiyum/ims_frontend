import { NetworkAssetResponse } from "../Inventory/asset/NetworkAssets";

interface PERouter {
  name: string;
  port: string;
  ip: string;
  wanIpPool: string;
  switchPort: string;
}

export interface PERouterRequset extends PERouter {
  assetId: number;
  networkSwitchId: number;
}

export interface PERouterResponse extends PERouter {
  id: number;
  asset: NetworkAssetResponse;
  networkSwitch: NetworkAssetResponse;
}
