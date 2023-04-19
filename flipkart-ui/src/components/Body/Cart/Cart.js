import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./Cart.module.css";
import CartItems from "./CartItems/CartItems";
import { useAuth } from "react-oidc-context";

export default function Cart() {
  const auth = useAuth();
  return (
    <Container className={styles["container"]} maxWidth={false}>
      <Grid container>
        <Grid
          item
          className={`${styles["container"]} `}
          lg={8}
          sx={{ justifyContent: "flex-start" }}
        >
          <Grid
            lg={12}
            className={`${styles["cart-items-container"]} ${styles["delivery-addr"]}`}
          >
            <Typography variant="body1">
              Deliver to: {auth?.user?.profile?.name} {auth?.user?.profile?.address?.postal_code}
            </Typography>
          </Grid>
          <Grid lg={12} className={`${styles["cart-items-container"]} `}>
            <CartItems />
          </Grid>
        </Grid>
        <Grid className={`${styles["cart-items-container"]} `} item lg={3}>
          Total
        </Grid>
      </Grid>
    </Container>
  );
}
