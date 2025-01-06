import { Employee } from "../Inventory/Employee";

export enum CustomerPriority {
  PLATINUM = "PLATINUM",
  GOLD = "GOLD",
  SILVER = "SILVER",
  BRONZE = "BRONZE",
}

interface Customer {
  name: string;
  priority: CustomerPriority;
  address: string;
  contactNo: string;
  email: string;
  accountManager: Employee;
  vsnlId: string;
  asNumber: string;
}

export interface CustomerRequest extends Customer {}
export interface CustomerResponse extends Customer {
    id: number
}
