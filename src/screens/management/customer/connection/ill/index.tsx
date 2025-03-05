import { useNavigate } from "react-router-dom";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons
} from "../../../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { illConnectionPageAction } from "../../../../../redux/slices/customer/connection/ill/page";
import { viewConnection } from "../../../../../redux/slices/customer/connection/view";
import { ConnectionResponse } from "../../../../../types/customer/Connection";
import { commonConnectionColumns, formatCommonRow } from "../utils";
import { customer_ill_view_connection } from "../../../../../utils/context-paths";

const columns: Column[] = commonConnectionColumns;

const IllConnection = () => {
  const illConnectionPageState = useAppSelector(
    (state) => state.connection.ill.page
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleViewConnection = (connection: ConnectionResponse) => {
    dispatch(viewConnection(connection));
    navigate(customer_ill_view_connection);    
  }

  const rowsFormatter = (rows: ConnectionResponse[]) =>
    rows.map((row) => ({
      ...formatCommonRow(row),
    actions: wrapActionButtons([
      actionButton(ActionIcontype.view, () => {handleViewConnection(row)}, 1),
      actionButton(ActionIcontype.terminate, () => {handleViewConnection(row)}, 1),
    ]),
    }));

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
