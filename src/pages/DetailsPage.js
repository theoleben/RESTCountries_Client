import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./DetailsPage.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 0,
}));

// const Item = styled(Box)(({ theme }) => ({
//   // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   // ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   // color: theme.palette.text.secondary,
//   borderRadius: 0,
//   border: "1px solid black",
//   border
// }));

const DetailsPage = () => {
  // const DUMMY_OBJ = {
  //   name: {
  //     common: "Christmas Island",
  //     official: "Territory of Christmas Island",
  //     nativeName: {
  //       eng: {
  //         official: "Territory of Christmas Island",
  //         common: "Christmas Island",
  //       },
  //     },
  //   },
  // };

  return (
    <>
      <Paper sx={{ width: "300px", height: "205px" }}>
        <Box
          component="img"
          sx={{
            height: "auto",
            width: "100%",
            borderRadius: "4px",
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />
      </Paper>
      <Paper sx={{ width: "500px", mt: 2, ml: 2 }} variant="outlined">
        <Typography textAlign="center">Names</Typography>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Item variant="outlined">Common</Item>
          </Grid>
          <Grid item xs={6}>
            <Item variant="outlined">Nom commun</Item>
          </Grid>
          <Grid item xs={6}>
            <Item variant="outlined">Official</Item>
          </Grid>
          <Grid item xs={6}>
            <Item variant="outlined">Nom officiel</Item>
          </Grid>
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
    </>
  );
};

export default DetailsPage;
