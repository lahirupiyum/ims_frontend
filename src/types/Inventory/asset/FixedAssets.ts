import { AssetRequest, AssetResponse } from "../../common/Asset"

 type FixedAsset = {
    invoiceNumber: string,
    purchaseDate: number,
    deprecationInfo: string
}

export interface FixedAssetRequest extends AssetRequest, FixedAsset  {

}

export interface FixedAssetResponse extends AssetResponse, FixedAsset  {

}