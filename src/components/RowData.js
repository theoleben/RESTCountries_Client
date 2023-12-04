import React from "react";
import { TableCell, TableRow } from "@mui/material";

const RowData = (props) => {
  return (
    <>
      {Array.from(props.data).map(([key2, value2], index2) => {
        // console.log("currency index:", index2);
        // console.log("currency key:", key2);
        // console.log("curency value: ", value2);
        if (index2 === 0) {
          return (
            <TableRow key={index2}>
              <TableCell rowSpan={props.data.size}>{props.title}</TableCell>
              <TableCell>{value2}</TableCell>
            </TableRow>
          );
        }

        return (
          <TableRow key={index2}>
            <TableCell>{value2}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default RowData;
