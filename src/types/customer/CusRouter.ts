import { NetworkAssetResponse } from "../Inventory/asset/NetworkAssets";

interface CusRouter {
  wanPort: string;
  lanPort: string;
  bandwidth: string;
  wanIpPool: string;
  lanIpPool: string;
}

export interface CusRouterRequest extends CusRouter {
  assetId: number;
}

export interface CusRouterRespone extends CusRouter {
  id: number;
  asset: NetworkAssetResponse;
}
