import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./TableComponent.css";

const TableComponent = (props) => {
  const map = props.data;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "500px", ml: 2, mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>{props.title}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(map).map(([key, value], index) => {
            //   console.log(key);
            //   console.log(value);
            //   console.log(index);
            return (
              <TableRow key={index}>
                <TableCell sx={{ width: "50%" }}>{key}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell rowSpan={3}>key</TableCell>
            <TableCell>value1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>value2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>value3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
