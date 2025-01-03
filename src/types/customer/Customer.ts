import { Employee } from "../Inventory/Employee";

enum Priority {
  PLATINUM,
  GOLD,
  SILVER,
  BRONZE,
}

interface Customer {
  name: string;
  customerPriority: Priority;
  address: string;
  contactNo: string;
  email: string;
  accountManager: Employee;
  vsnl: string;
  asNumber: string;
}

export interface CustomerRequest extends Customer {}
export interface CustomerResponse extends Customer {
    id: number
}
