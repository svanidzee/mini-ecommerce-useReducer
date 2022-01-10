import React from "react";

import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import useStyles from "./styles";

const CartItem = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        image={props.imageUrl}
        alt={props.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{props.name}</Typography>
        <Typography variant="h5">${props.price}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={props.onRemove}>
            -
          </Button>
          <Typography>{props.amount}</Typography>
          <Button type="button" size="small" onClick={props.onAdd}>
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={props.onSingleRemove}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default React.memo(CartItem);
