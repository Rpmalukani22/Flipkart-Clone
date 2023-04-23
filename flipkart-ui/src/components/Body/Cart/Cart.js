import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./Cart.module.css";
import CartItems from "./CartItems/CartItems";
import { useAuth } from "react-oidc-context";
import TotalView from "./TotalView";

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
          <Grid item
            lg={12}
            className={`${styles["cart-items-container"]} ${styles["delivery-addr"]}`}
          >
            <Typography variant="body1">
              Deliver to: {auth?.user?.profile?.name}, {auth?.user?.profile?.address?.postal_code || "2053 Denver Avenue, 92501"}
            </Typography>
            <Button> Change </Button>
          </Grid>
          <Grid item lg={12} className={`${styles["cart-items-container"]} `}>
            <CartItems />
          </Grid>
        </Grid>
        <Grid className={`${styles["cart-items-container"]} `} item lg={3}>
          <TotalView></TotalView>
        </Grid>
      </Grid>
    </Container>
  );
}