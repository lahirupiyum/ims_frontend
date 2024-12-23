import { Location } from "../Inventory/Location"
import { Manufacturer } from "../Inventory/Manufacturer"
import { Model } from "../Inventory/Model"
import { Status } from "../Inventory/Status"
import { Type } from "../Inventory/Type"
import { VendorResponse } from "../Vendor"
//import {  VendorResponse } from "../Vendor"

export type AssetRequest = {
    assetNumber: string,
    serialNumber: string,
    manufactureId: number,
    quantity: number,
    vendorId: number,
    locatoionId: number,
    model: Model,
    type: Type
}

export type AssetResponse = {
    id: number,
    assetNumber: string,
    serialNumber: string,
    quantity: number,
    manufacturer: Manufacturer 
    vendor: VendorResponse,
    location: Location,
    model: Model,
    type: Type,
    status: Status
}