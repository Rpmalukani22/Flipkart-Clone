import { Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  clearCart,
  removeItem,
} from "../../../../features/cart/cartSlice";

export default function CartItems({ items }) {
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
  return cartItems.length === 0 ? (
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
  );
}
