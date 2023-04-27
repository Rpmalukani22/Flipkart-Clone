import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./Cart.module.css";
import CartItems from "./CartItems/CartItems";
import { useAuth } from "react-oidc-context";
import TotalView from "./TotalView";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export default function Cart() {
  const auth = useAuth();
  const [clientSecret, setClientSecret] = useState(null);
  const options = {
    clientSecret: clientSecret,
  };

  const stripePromise = loadStripe(
    "pk_test_51N12YcSDW5FA0noG1EEHM6FtiAOsG3QFv4g4jPKIjG31fVROViY9tHN15C4zp5fqfAJK9jSYNHwxkowLXDINeYTx00njchcWWL"
  );

  //-------------------------------------------------------------
  const createPaymentIntent = async (amount, currency) => {
    const response = await axios.post(
      `/api/product-management/create-payment-intent?amount=${amount}&currency=${currency}`
    );
    const data = await response.data;
    setClientSecret(data);
    // console.log("Response is ",data)
  };
  // ---------------------------------------------------------------
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
            item
            lg={12}
            className={`${styles["cart-items-container"]} ${styles["delivery-addr"]}`}
          >
            <Typography variant="body1">
              Deliver to: {auth?.user?.profile?.name},{" "}
              {auth?.user?.profile?.address?.postal_code ||
                "2053 Denver Avenue, 92501"}
            </Typography>
            <Button> Change </Button>
          </Grid>
          <Grid item lg={12} className={`${styles["cart-items-container"]} `}>
            <CartItems />
          </Grid>
        </Grid>
        <Grid className={`${styles["cart-items-container"]} `} item lg={3}>
          <button onClick={() => createPaymentIntent(100, "inr")}>
            Pay $1.00
          </button>
          {clientSecret && (
            <Elements stripe={stripePromise} options={options}>
              <TotalView></TotalView>
            </Elements>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
