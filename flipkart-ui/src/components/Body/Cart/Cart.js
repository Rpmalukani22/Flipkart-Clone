import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import styles from "./Cart.module.css";
import {
  addItem,
  removeItem,
  clearCart,
} from "../../../features/cart/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container className={styles["container"]} maxWidth={false}>
      <Grid container>
        <Grid item className={`${styles["container"]} `} lg={8} sx={{justifyContent:"flex-start"}}>
          <Grid lg={12} className={`${styles["cart-items-container"]} `}>
            item1
          </Grid>
          <Grid lg={12} className={`${styles["cart-items-container"]} `}>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <Grid container sx={{ border: "1px solid red" }}>
                    <Grid item sx={{ border: "1px solid blue" }}>
                      Item1
                    </Grid>
                    <Grid item lg={9} sx={{ border: "1px solid blue" }}>
                      Item2
                    </Grid>
                  </Grid>
                ))}
                <p>Total: {total}</p>
                <button onClick={handleClearCart}>Clear Cart</button>
              </>
            )}
          </Grid>
        </Grid>
        <Grid className={`${styles["cart-items-container"]} `} item lg={3}>
          Total
        </Grid>
      </Grid>
    </Container>
  );
}
