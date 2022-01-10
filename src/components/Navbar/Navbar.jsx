import React, { Fragment, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import CartContext from "../../store/cart-context";

import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import logo from "../../assets/5567.jpg";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();

  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            varinat="h6"
            className={classes.title}
            color="inherit"
          >
            Keyboards
          </Typography>
          <div className={classes.grow} />

          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={numberOfCartItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;
