import CustomTable, {
  Column
} from "../../../../../components/table";
import { useAppSelector } from "../../../../../redux/hooks";
import { illConnectionPageAction } from "../../../../../redux/slices/customer/connection/ill/page";
import { ConnectionResponse } from "../../../../../types/customer/Connection";
import { commonConnectionColumns, formatCommonRow } from "../utils";

const columns: Column[] = commonConnectionColumns;

const IllConnection = () => {
  const illConnectionPageState = useAppSelector(
    (state) => state.connection.ill.page
  );

  const rowsFormatter = (rows: ConnectionResponse[]) =>
    rows.map((row, index) => formatCommonRow(row));

  return (
    <>
      <CustomTable
        columns={columns}
        rowsFormatter={rowsFormatter}
        pageState={illConnectionPageState}
        pageAction={illConnectionPageAction}
      />
    </>
  );
};

export default IllConnection;
