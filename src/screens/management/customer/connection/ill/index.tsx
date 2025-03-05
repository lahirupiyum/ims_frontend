import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../../../../components/delete-dialog";
import CustomTable, {
  actionButton,
  ActionIcontype,
  Column,
  wrapActionButtons,
} from "../../../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  illConnectionPageAction,
  illConnectionUpdaetOneInList,
} from "../../../../../redux/slices/customer/connection/ill/page";
import {
  activateConnectionAction,
  connectionTerminateAndActivateReset,
  terminateConnectionAction,
} from "../../../../../redux/slices/customer/connection/terminate";
import { viewConnection } from "../../../../../redux/slices/customer/connection/view";
import { ConnectionResponse } from "../../../../../types/customer/Connection";
import { customer_ill_view_connection } from "../../../../../utils/context-paths";
import { commonConnectionColumns, formatCommonRow } from "../utils";

const columns: Column[] = commonConnectionColumns;

const IllConnection = () => {
  const illConnectionPageState = useAppSelector(
    (state) => state.connection.ill.page
  );

  const { data: terminatedConnection, loading } = useAppSelector(
    (state) => state.connection.terminateAndActivate
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedConnectionId, setSelectedConnectionId] = useState<number>(-1);
  const [selectedIndexToTerminate, setSelectedIndexToTerminate] =
    useState<number>(-1);

  const [powerActionType, setPowerActionType] = useState<
    "terminate" | "activate"
  >("terminate");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!terminatedConnection) return;
    dispatch(
      illConnectionUpdaetOneInList({
        index: selectedIndexToTerminate,
        data: terminatedConnection,
      })
    );
    dispatch(connectionTerminateAndActivateReset());
  }, [loading]);

  const handleViewConnection = (connection: ConnectionResponse) => {
    dispatch(viewConnection(connection));
    navigate(customer_ill_view_connection);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedConnectionId(-1);
  };

  const openDialog = (
    id: number,
    index: number,
    actionType: "terminate" | "activate"
  ) => {
    setSelectedConnectionId(id);
    setSelectedIndexToTerminate(index);
    setIsOpen(true);
    setPowerActionType(actionType);
  };

  const handleActivateOrTerminateConnection = () => {
    if (powerActionType === "activate")
      dispatch(activateConnectionAction(selectedConnectionId));
    else if (powerActionType === "terminate")
      dispatch(terminateConnectionAction(selectedConnectionId));
    closeDialog();
  };

  const rowsFormatter = (rows: ConnectionResponse[]) =>
    rows.map((row, index) => ({
      ...formatCommonRow(row),
      actions: wrapActionButtons([
        actionButton(
          ActionIcontype.view,
          () => {
            handleViewConnection(row);
          },
          1
        ),
        actionButton(
          ActionIcontype.power,
          () => {
            openDialog(
              row.id,
              index,
              row.activeStatus ? "terminate" : "activate"
            );
          },
          2
        ),
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
      <DeleteDialog
        name="Connection"
        customActionName={powerActionType}
        deleteFunction={handleActivateOrTerminateConnection}
        handleClose={closeDialog}
        open={isOpen}
        customDescription=""
        actionButtonColor={
          powerActionType === "activate" ? "success.main" : "error.main"
        }
      />
    </>
  );
};

export default IllConnection;
