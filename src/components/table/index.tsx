import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { IoEyeOutline, IoPowerSharp } from "react-icons/io5";
import { useAppDispatch } from "../../redux/hooks";
import { PageState } from "../../redux/slices/config/globalPageSlice";
import { fontSizes, fontWeights } from "../typography/CustomTypography";

type TableType<T> = {
  columns: Column[];
  rowsFormatter: (rows: any[]) => any[];
  pageState: PageState<T>;
  pageAction: (
    page: number,
    pageSize: number
  ) => (dispath: ReturnType<typeof useAppDispatch>) => Promise<void>;
};

const CustomTable = <ResponseType,>({
  columns,
  rowsFormatter,
  pageState,
  pageAction,
}: TableType<ResponseType>) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const dispatch = useAppDispatch();
  const { data, totalCount, loading, actionType } = pageState;

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(pageAction(page, rowsPerPage));
  }, [page, rowsPerPage]);

  const rows = rowsFormatter(data);

  return (
    <Box>
      <Paper
        sx={{
          width: "100%",
          // p: "10px",
          overflow: "hidden",
          bgcolor: "transparent",
          boxShadow: "none",
          // px:"20px"
        }}
      >
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      bgcolor: "black",
                      color: "white",
                      fontSize: fontSizes.xs,
                      fontWeight: fontWeights.xl,
                      textTransform: "uppercase",
                    }}
                    key={column.id}
                    align={"center"}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      let value;
                      try {
                        value = row[column.id];
                      } catch (e) {
                        value = null;
                      }
                      return (
                        <TableCell
                          key={column.id}
                          align="center"
                          sx={{ fontSize: fontSizes.xs }}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {actionType === "page" && <Paper
          sx={{
            boxShadow: "none",
            position: "absolute",
            right: "0",
            bottom: "0",
            width: "100%",
          }}
        >
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={(event) =>
              setRowsPerPage(event.target.value as unknown as number)
            }
          />
        </Paper>}
        {rows.length === 0 && !loading ? (
          <Box sx={{ position: "absolute", top:"55%", left:"55%", zIndex:10 }}>No data found!</Box>
        ) : loading? <Box sx={{ position: "absolute", top:"55%", left:"55%", zIndex:10 }}><CircularProgress /></Box>: null}
      </Paper>
    </Box>
  );
};

export interface Column {
  id: string;
  label: string;
  minWidth: number;
}
export enum ActionIcontype {
  edit,
  delete,
  view,
  power,
  activate
}

const getActionTypeIcon = (icon: ActionIcontype) => {
  switch (icon) {
    case ActionIcontype.edit:
      return <CiEdit />;
    case ActionIcontype.delete:
      return <CiTrash />;
    case ActionIcontype.view:
      return <IoEyeOutline />;
    case ActionIcontype.power:
      return <IoPowerSharp  />
    case ActionIcontype.activate:
    default:
      return null;
  }
};

export const actionButton = (
  icon: ActionIcontype,
  onClick: () => void,
  key: number,
  hidden?:boolean
) => {
  if (hidden) return null;
  return (
    <IconButton key={key} sx={{ fontSize: fontSizes.md }} onClick={onClick}>
      {getActionTypeIcon(icon)}
    </IconButton>
  );
};

export const wrapActionButtons = (
  actionButtonList: ReturnType<typeof actionButton>[]
) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0px",
      }}
    >
      {actionButtonList.map((actionButton) => actionButton)}
    </Box>
  );
};

export type ActionButtonType = ReturnType<typeof actionButton>;

export default CustomTable;
