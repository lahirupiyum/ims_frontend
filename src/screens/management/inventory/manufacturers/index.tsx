import React from 'react'
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../components/table";

const columns: Column[] = [
  { id: "actions", label: "Actions", minWidth: 50 },
  { id: "id", label: "ID", minWidth: 20 },
  { id: "name", label: "Name", minWidth: 50 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "contactNo", label: "Contact Number", minWidth: 100 },
];

const Manufacturers = () => {
  return (
    <>
     {/* <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={vendorPageState}
        pageAction={vendorPageAction}
      />  */}
    </>
  )
}

export default Manufacturers
