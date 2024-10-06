import {
  Box,
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
import React, { useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { fontSizes, fontWeights } from "../typography/CustomTypography";

const CustomTable = <T,>({
  columns,
  rows,
}: {
  columns: Column[];
  rows: T[];
}): React.ReactNode => {
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [page, setPage] = useState(0);

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

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
        <Paper
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
            count={rows.length}
            rowsPerPage={rowsPerPage as unknown as number}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={(event) => setRowsPerPage(event.target.value)}
          />
        </Paper>
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
}

const getActionTypeIcon = (icon: ActionIcontype) => {
  switch (icon) {
    case ActionIcontype.edit:
      return <CiEdit />;
    case ActionIcontype.delete:
      return <CiTrash />;
    default:
      return null;
  }
};

export const actionButton = (icon: ActionIcontype, onClick: () => void) => {
  return <IconButton sx={{fontSize:fontSizes.md}} onClick={onClick}>{getActionTypeIcon(icon)}</IconButton>;
};

export default CustomTable;