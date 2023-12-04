import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandData = (props) => {
  return (
    <Accordion variant="outlined">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ p: 0 }}
      >
        <Typography>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Table>
          <TableBody>
            {Array.from(props.data).map(([key, value], index) => {
              // console.log("native name key:", key2);
              // console.log("native name value: ", value2);
              return (
                <TableRow key={index}>
                  <TableCell sx={{ width: "50%" }}>{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpandData;
