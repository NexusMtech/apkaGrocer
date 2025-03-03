import React, { FC } from "react";
import { 
  Table, TableHead, TableBody, TableRow, TableCell, 
  TablePagination 
} from "@mui/material";

interface DataRow {
  [key: string]: string | number | boolean | null; // Define possible data types
}

interface DataTableProps {
  data: DataRow[]; // Enforce typed array instead of `any`
}

const DataTable: FC<DataTableProps> = ({ data }) => {
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {data.length > 0 && 
              Object.keys(data[0]).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow key={index}>
              {Object.entries(row).map(([key, value]) => (
                <TableCell key={key}>{String(value)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination 
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};

export default DataTable;
