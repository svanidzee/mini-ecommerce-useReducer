import React, { Fragment, useContext, useRef, useCallback } from "react";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Input,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import useStyles from "./styles";
import CartContext from "../../../store/cart-context";

const Product = ({ product, loading }) => {
  const classes = useStyles();
  const amountInputRef = useRef();

  const cartCtx = useContext(CartContext);
  // const hasItems = cartCtx.items.length > 0;

  const addToCartHandler = useCallback((amount) => {
    cartCtx.addItem({
      id: product.id,
      name: product.name,
      amount: amount,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return;
    }

    addToCartHandler(enteredAmountNumber);
  };

  return (
    <Fragment>
      <Card className={classes.root}>
        {/*  */}
        {!loading && (
          <>
            <CardMedia
              className={classes.media}
              image={product.imageUrl}
              title={product.name}
            />
            <CardContent>
              <div className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="h5">${product.price}</Typography>
              </div>
              <Typography variant="body2" color="textSecondary">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
              <form onSubmit={submitHandler}>
                <Input
                  color="secondary"
                  name="Amount"
                  inputRef={amountInputRef}
                  inputProps={{
                    id: "amount_" + product.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                  }}
                />
                <Button
                  type="submit"
                  // variant="contained"
                  // color="primary"
                  // size="medium"
                  startIcon={<AddShoppingCart />}
                  disableElevation
                  disableFocusRipple
                  disableRipple
                  // className={classes.root}
                />
              </form>
            </CardActions>
          </>
        )}
      </Card>
    </Fragment>
  );
};

export default React.memo(Product);
