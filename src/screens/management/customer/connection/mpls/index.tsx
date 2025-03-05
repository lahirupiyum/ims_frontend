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
  mplsConnectionPageAction,
  mplsConnectionUpdateOneInList,
  mplsSearchAction,
} from "../../../../../redux/slices/customer/connection/mpls/page";
import {
  activateConnectionAction,
  connectionTerminateAndActivateReset,
  terminateConnectionAction,
} from "../../../../../redux/slices/customer/connection/terminate";
import { viewConnection } from "../../../../../redux/slices/customer/connection/view";
import {
  resetSearchActionParams,
  updateSearchActionParams,
} from "../../../../../redux/slices/searchActionSlice";
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
      mplsConnectionUpdateOneInList({
        index: selectedIndexToTerminate,
        data: terminatedConnection,
      })
    );
    dispatch(connectionTerminateAndActivateReset());
  }, [loading]);

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

  const handleViewConnection = (connection: ConnectionResponse) => {
    dispatch(viewConnection(connection));
    navigate(customer_mpls_view_connection);
  };

  useEffect(() => {
    dispatch(
      updateSearchActionParams({
        pageAction: mplsConnectionPageAction,
        searchAction: mplsSearchAction,
      })
    );

    return () => {
      dispatch(resetSearchActionParams());
    };
  }, [dispatch]);

  const rowsFormatter = (rows: ConnectionResponse[]) =>
    rows.map((row, index) => ({
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
          ActionIcontype.power,
          () => {
            openDialog(
              row.id,
              index,
              row.activeStatus ? "terminate" : "activate"
            );
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

export default MplsConnection;
