import React, { Fragment } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 0,
}));

const GridComponent = (props) => {
  //   console.log("props: ", props);
  const map = props.data;

  return (
    <Paper sx={{ width: "500px", mt: 2, ml: 2 }} variant="outlined">
      <Typography textAlign="center">{props.title}</Typography>
      <Grid container spacing={0}>
        {Array.from(map).map(([key, value], index) => {
          //   console.log(key);
          //   console.log(value);
          //   console.log(index);
          return (
            <Fragment key={index}>
              <Grid item xs={6}>
                <Item variant="outlined">{key}</Item>
              </Grid>
              <Grid item xs={6}>
                {typeof value === "boolean" ? (
                  <Item variant="outlined">{value ? "Yes" : "No"}</Item>
                ) : (
                  <Item variant="outlined">{value}</Item>
                )}
              </Grid>
            </Fragment>
          );
        })}
        <Grid item xs={12}>
          <Accordion variant="outlined">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ p: 0 }}
            >
              <Typography>Native names</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Grid container spacing={0} sx={{ width: "100%" }}>
                <Grid item xs={6}>
                  <Item variant="outlined">English (official)</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item variant="outlined">Official name in English</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item variant="outlined">English (common)</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item variant="outlined">Common name in English</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item variant="outlined">Samoa (official)</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item variant="outlined">Official name in Samoa</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item variant="outlined">Samoa (commun)</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item variant="outlined">Common name in Samoa</Item>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default GridComponent;
