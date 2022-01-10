import React, { useContext, useCallback } from "react";
import CartItem from "./CartItem/CartItem";
import CartContext from "../../store/cart-context";

import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";

const Cart = () => {
  const classes = useStyles();
  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = useCallback((id) => {
    cartCtx.removeItem(id);
  }, []);

  const cartSingleRemoveHandler = useCallback((id) => {
    cartCtx.removeSingleItem(id);
  }, []);

  const cartItemAddHandler = useCallback((item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  }, []);

  const clearCart = useCallback(() => {
    if (window.confirm("Are you sure you want to clear cart?")) {
      cartCtx.clearItems();
    }
  }, []);

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shop cart
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cartCtx.items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              imageUrl={item.imageUrl}
              //
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
              onAdd={cartItemAddHandler.bind(null, item)}
              onSingleRemove={cartSingleRemoveHandler.bind(null, item.id)}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5">Subtotal: ${cartCtx.totalAmount}</Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={clearCart}
          >
            Empty Cart
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom>
        Your Shopping Cart
      </Typography>

      {cartCtx.totalAmount ? <FilledCart /> : <EmptyCart />}
    </Container>
  );
};

export default Cart;
