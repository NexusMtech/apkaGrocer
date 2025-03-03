import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Column {
  id: string;
  label: string;
}

interface Row {
  [key: string]: any;
}

interface CommonTableProps {
  columns: Column[];
  rows: Row[];
}

const StyledTableHead = styled(TableHead)({
  backgroundColor: "black",
  '& th': {
    color: "#ffffff",
    fontWeight: "bold"
  }
});

const StyledTableRow = styled(TableRow)({
  '&:hover': {
    backgroundColor: "#f5f5f5"
  }
});

const CommonTable: React.FC<CommonTableProps> = ({ columns, rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <StyledTableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;