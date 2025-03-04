import CustomTable, { Column } from "../../../../../components/table";
import { useAppSelector } from "../../../../../redux/hooks";
import { mplsConnectionPageAction } from "../../../../../redux/slices/customer/connection/mpls/page";
import { ConnectionResponse } from "../../../../../types/customer/Connection";
import { commonConnectionColumns, formatCommonRow } from "../utils";

const columns: Column[] = [
  ...commonConnectionColumns,
  { id: "manageStatus", label: "Manage Status", minWidth: 50 },
];

const MplsConnection = () => {
  const mplsConnectionPageState = useAppSelector(
    (state) => state.connection.mpls.page
  );

  const rowsFormatter = (rows: ConnectionResponse[]) =>
    rows.map((row) => ({...formatCommonRow(row), manageStatus: row.manageStatus}));

  return (
    <>
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageAction={mplsConnectionPageAction}
        pageState={mplsConnectionPageState}
      />
    </>
  );
};

export default MplsConnection;
