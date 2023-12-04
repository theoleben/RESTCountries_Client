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
import ExpandData from "./ExpandData";
import RowData from "./RowData";
import "./TableComponent.css";

const TableComponent = (props) => {
  const map = props.data;
  // console.log(map);

  return (
    <TableContainer component={Paper}>
      {/* <Table sx={{ width: "500px", ml: 2, mt: 2 }}> */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>{props.title}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(map).map(([key, value], index) => {
            // console.log(key);
            // console.log(value);

            if (
              key === "Native names" ||
              key === "Native names" ||
              key === "Languages" ||
              key === "Language"
            ) {
              return (
                <TableRow key={index}>
                  <TableCell colSpan={2} className="expand">
                    <ExpandData title={key} data={value} />
                  </TableCell>
                </TableRow>
              );
            }

            if (key === "Currencies" || key === "Currency") {
              // console.log(value.size);
              return <RowData key={index} title={key} data={value} />;
            }

            return (
              <TableRow key={index}>
                <TableCell sx={{ width: "50%" }}>{key}</TableCell>
                {typeof value === "boolean" ? (
                  <TableCell>{value ? "Yes" : "No"}</TableCell>
                ) : (
                  <TableCell>{value}</TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
