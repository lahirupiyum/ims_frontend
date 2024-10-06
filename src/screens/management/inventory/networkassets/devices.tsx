import { useEffect } from "react";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
} from "../../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fetchPage } from "../../../../redux/slices/network/device/page";

const Devices = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.networkDevicePage);

  useEffect(() => {
    dispatch(fetchPage({page: 0, pageSize:10}));
  },[])

  console.log(state);
  
  const columns: Column[] = [
    {id: "actions", label: "Actions",  minWidth: 50 },
    {id: "serialNumber", label: "Serial Number",   minWidth: 50,  },
    {
      id: "quantity",
      label: "Quantity",
      minWidth: 20,
    },
    {
      id: "type",
      label: "Device Type",
      minWidth: 30,
    },
    {
      id: "model",
      label: "Device Model",
      minWidth: 30,
    },
    {
      id: "status",
      label: "Device Status",
      minWidth: 50,
    },
    {
      id: "branch",
      label: "Branch",
      minWidth: 100,
    },
    {
      id: "vendor",
      label: "Vendor",
      minWidth: 100,
    },
  ];

  const rows = [
    {
      actions: actionButton(ActionIcontype.edit, () =>
        console.log("Edit clicked")
      ),
      serialNumber: "ND12345",
      quantity: 10,
      type: "Router",
      model: "Cisco RV340",
      status: "Operational",
      branch: "New York",
      vendor: "Cisco Systems",
    },
    {
      actions: actionButton(ActionIcontype.delete, () =>
        console.log("Delete clicked")
      ),
      serialNumber: "ND12346",
      quantity: 5,
      type: "Switch",
      model: "Netgear GS308",
      status: "In Use",
      branch: "San Francisco",
      vendor: "Netgear",
    },
    {
      actions: actionButton(ActionIcontype.edit, () =>
        console.log("Edit clicked")
      ),
      serialNumber: "ND12347",
      quantity: 12,
      type: "Firewall",
      model: "Fortinet FG-60E",
      status: "Maintenance",
      branch: "Chicago",
      vendor: "Fortinet",
    },
    {
      actions: actionButton(ActionIcontype.delete, () =>
        console.log("Delete clicked")
      ),
      serialNumber: "ND12348",
      quantity: 7,
      type: "Access Point",
      model: "Ubiquiti UAP-AC-PRO",
      status: "Operational",
      branch: "Los Angeles",
      vendor: "Ubiquiti",
    },
    {
      actions: actionButton(ActionIcontype.edit, () =>
        console.log("Edit clicked")
      ),
      serialNumber: "ND12349",
      quantity: 20,
      type: "Modem",
      model: "Motorola MB7621",
      status: "Decommissioned",
      branch: "Houston",
      vendor: "Motorola",
    },
  ];

  return <CustomTable columns={columns} rows={rows} />;
};

export default Devices;
