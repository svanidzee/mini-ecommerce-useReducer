import React, { useState, useEffect } from "react";
import keyboards from "../../apis/keyboards";

import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";

const Products = () => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fetching) {
      setLoading(true);
      keyboards
        .get("https://61dc43d8591c3a0017e1a80b.mockapi.io/items")
        .then((response) => {
          setItems((prevState) => [...prevState, ...response.data]);
        })
        .finally(() => {
          setFetching(false);
          setLoading(false);
        });
    }
  }, [fetching]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {items.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} loading={loading} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
