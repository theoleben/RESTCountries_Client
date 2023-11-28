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
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const CardComponent = (props) => {
  return (
    <Card sx={{ width: 300 }} variant="outlined">
      <CardActionArea>
        <CardMedia
          sx={{ height: 140 }}
          component="img"
          image="https://www.reserveafricainesigean.fr/content/uploads/2017/05/iguane-fiche.jpg"
          title="green iguana"
        />
      </CardActionArea>
      <CardContent sx={{ pb: 0 }}>
        <Typography gutterBottom variant="h5" component="div">
          Name of the country
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
            <ListItemText
              primary={`Capitale: ${props.data.capitale}`}
            ></ListItemText>
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
        <Link to="detail/1">
          <IconButton>
            <ArrowCircleRightIcon />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
