import { useNavigate } from "react-router-dom";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { mplsConnectionPageAction } from "../../../../../redux/slices/customer/connection/mpls/page";
import { viewConnection } from "../../../../../redux/slices/customer/connection/view";
import { ConnectionResponse } from "../../../../../types/customer/Connection";
import { customer_mpls_view_connection } from "../../../../../utils/context-paths";
import { commonConnectionColumns, formatCommonRow } from "../utils";

const columns: Column[] = [
  ...commonConnectionColumns,
  { id: "manageStatus", label: "Manage Status", minWidth: 50 },
];

const MplsConnection = () => {
  const mplsConnectionPageState = useAppSelector(
    (state) => state.connection.mpls.page
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleViewConnection = (connection: ConnectionResponse) => {
    dispatch(viewConnection(connection));
    navigate(customer_mpls_view_connection);
  };

  const rowsFormatter = (rows: ConnectionResponse[]) =>
    rows.map((row) => ({
      ...formatCommonRow(row),
      manageStatus: row.manageStatus,
      actions: wrapActionButtons([
        actionButton(
          ActionIcontype.view,
          () => {
            handleViewConnection(row);
          },
          1
        ),
        actionButton(
          ActionIcontype.terminate,
          () => {
            handleViewConnection(row);
          },
          1
        ),
      ]),
    }));

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
