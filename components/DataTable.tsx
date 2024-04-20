import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  styled,
} from "@mui/material";
import React, { useState } from "react";

export type Column = {
  id: string;
  label: string;
  renderCell?: (rowData: any) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  cellProps?: TableCellProps;
  headerCellProps?: TableCellProps;
};

export type RowData = {
  [key: string]: any;
};

type Props = {
  columns: Column[];
  data: RowData[];
  isLoading?: boolean;
  isPagination?: boolean;
};

export const StyledTableRow = styled(TableRow)(
  ({ theme }) => `
  background-color: ${theme.palette.secondary.main};
 `
);

export const StyledTableCell = styled(TableCell)(
  ({ theme }) => `
  color: white;
  font-weight: bold;
 `
);

const DataTable: React.FC<Props> = ({
  columns,
  data,
  isLoading = false,
  isPagination = true,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell {...column.headerCellProps} key={column.id}>
                  {column.renderHeader ? column.renderHeader() : column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : isPagination ? (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column: any) => (
                      <TableCell {...column.cellProps} key={column.id}>
                        {column.renderCell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column: any) => (
                    <TableCell {...column.cellProps} key={column.id}>
                      {column.renderCell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default DataTable;
