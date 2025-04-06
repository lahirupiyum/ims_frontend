import { NetworkAssetResponse } from "../Inventory/asset/NetworkAssets";

export enum RouterOwnership {
  TATA= "TATA",
  CUSTOMER = "CUSTOMER"
}

interface CusRouter {
  bandwidth: string;
  wanIpAddress: string;
  asNumber: string;
  lanIpPool: string;
  ownership: RouterOwnership;
}

export interface CusRouterRequest extends CusRouter {
  assetId: number;
}

export interface CusRouterResponse extends CusRouter {
  id: number;
  asset: NetworkAssetResponse;
}
