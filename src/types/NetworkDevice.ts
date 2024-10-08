import { BranchResponse } from "./Branch";
import { NetworkDeviceManufacturerResponse } from "./NetworkDeviceManufacturer";
import { NetworkDeviceModelResponse } from "./NetworkDeviceModel";
import { NetworkDeviceStatusResponse } from "./NetworkDeviceStatus";
import { NetworkDeviceTypeResponse } from "./NetworkDeviceType";
import { VendorResponse } from "./Vendor";

export type NetworkDeviceRequest = {
    serialNumber: string;
  quantity: number;
  typeId: number;
  manufacturerId: number;
  modelId: number;
  statusId: number;
  vendorId: number;
  branchId: number;
}

export type NetworkDeviceResponse = {
  id: number;
  serialNumber:string;
  quantity: number;
  type: NetworkDeviceTypeResponse;
  manufacturer: NetworkDeviceManufacturerResponse;
  model: NetworkDeviceModelResponse;
  status: NetworkDeviceStatusResponse;
  branch: BranchResponse;
  vendor: VendorResponse;  
}