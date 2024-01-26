import React from "react";
import {
  CardActionArea,
  CardContent,
  Typography,
  Card,
  ListItem,
  ListItemText,
  List,
  CardMedia,
  CardActions,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const CardComponent = (props) => {
  // console.log(props);
  return (
    <Card sx={{ width: 300 }} variant="outlined">
      <CardActionArea>
        <CardMedia
          sx={{ height: 140 }}
          component="img"
          image={
            props.data.name.common === "Afghanistan"
              ? "https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Afghanistan_%28Colored_Emblem%29.svg"
              : props.data.flags.svg
          }
          title={
            props.data.flags?.alt
              ? props.data.flags.alt
              : `This is the flag of the ${props.data.name.common}`
          }
        />
      </CardActionArea>
      <CardContent sx={{ pb: 0 }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.name.common}
        </Typography>
        <List sx={{}}>
          <ListItem sx={{ py: 0, pl: 0 }}>
            <ListItemText primary={`Region: ${props.data.region}`} />
          </ListItem>
          <ListItem sx={{ py: 0, pl: 0 }}>
            <ListItemText
              primary={`Subregion: ${props.data.subregion}`}
            ></ListItemText>
          </ListItem>
          <ListItem sx={{ py: 0, pl: 0 }}>
            {props.data?.capital ? (
              <ListItemText
                primary={`${
                  props.data.capital.length > 1 ? "Capitals" : "Capital"
                }: ${props.data.capital}`}
              ></ListItemText>
            ) : (
              <>
                <ListItemText primary={`Capital:`}></ListItemText>
                <ListItemIcon sx={{ flexGrow: 10 }}>
                  <CloseIcon />
                </ListItemIcon>
              </>
            )}
          </ListItem>
          <ListItem sx={{ py: 0, pl: 0 }}>
            <ListItemText primary={`European Union:`}></ListItemText>
            <ListItemIcon sx={{ flexGrow: 10 }}>
              {props.data.unMember ? <CheckIcon /> : <CloseIcon />}
            </ListItemIcon>
          </ListItem>
        </List>
      </CardContent>
      <CardActions sx={{ pt: 0, justifyContent: "end" }}>
        <Link to={`details/${props.data.cca3}`}>
          <IconButton>
            <ArrowCircleRightIcon color="secondary" />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
