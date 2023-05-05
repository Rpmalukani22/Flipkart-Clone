import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import CartItems from "./CartItems/CartItems";
import { useAuth } from "react-oidc-context";
import TotalView from "./TotalView";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Cart() {
  const auth = useAuth();
  const cartItems = useSelector((state) => state);
  const [clientSecret, setClientSecret] = useState(null);
  const [stripeElementOptions, setStripeElementOptions] = useState({});

  useEffect(() => {
    if (clientSecret) {
      setStripeElementOptions((options) => {
        return {
          ...options,
          clientSecret: clientSecret,
        };
      });
    }
  }, [clientSecret]);

  const stripePromise = loadStripe(
    "pk_test_51N12YcSDW5FA0noG1EEHM6FtiAOsG3QFv4g4jPKIjG31fVROViY9tHN15C4zp5fqfAJK9jSYNHwxkowLXDINeYTx00njchcWWL"
  );

  //-------------------------------------------------------------
  const createPaymentIntent = async (amount, currency) => {
    if (!auth?.isAuthenticated) auth.signinRedirect();
    const response = await axios.post(
      `/api/product-management/create-payment-intent?amount=${amount}&currency=${currency}`,{},{
        headers: {
          Authorization: `Bearer ${auth.user.access_token}`,
        },
      }
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
          lg={cartItems.length>0?8:12}
          sx={{ justifyContent: "flex-start"}}
        >
          {cartItems.length!==0 && <Grid
            item
            lg={12}
            className={`${styles["cart-items-container"]} ${styles["delivery-addr"]}`}
          >
            <Typography variant="body1" sx={{width:"90%"}}>
              {auth.isAuthenticated
                ? "Deliver to: " +
                  auth?.user?.profile?.name +
                  " " +
                  (auth?.user?.profile?.address?.postal_code ||
                    "2053 Denver Avenue, 92501")
                : ""}
            </Typography>
            {auth.isAuthenticated ? (
              <Button> Change </Button>
            ) : (
              <Box sx={{display:"flex",width:"100%",alignItems:"center"}}>
              <Typography sx={{width:"90%",fontSize:"1rem"}}>To ensure we have your correct shipping address on file, please log in to your account and complete your purchase </Typography>
              <Button
              sx={{pt:1}}
                onClick={() => {
                  auth.signinRedirect();
                }}
              >
                {" "}
                Login{" "}
              </Button>
              </Box>
            )}
          </Grid>}
          <Grid item lg={12} className={`${styles["cart-items-container"]} `}>
            <CartItems />
          </Grid>
        </Grid>
        {cartItems.length !== 0 && (
          <Grid className={`${styles["cart-items-container"]} `} item lg={3}>
            {/* <button onClick={() => createPaymentIntent(100, "inr")}>
            Pay $1.00
          </button> */}

            {!stripeElementOptions?.clientSecret && (
              <Elements stripe={stripePromise} options={stripeElementOptions}>
                <TotalView
                  paymentTools={{
                    createPaymentIntent: createPaymentIntent,
                    clientSecret: stripeElementOptions?.clientSecret,
                  }}
                ></TotalView>
              </Elements>
            )}

            {stripeElementOptions?.clientSecret && auth?.isAuthenticated && (
              <Elements stripe={stripePromise} options={stripeElementOptions}>
                <TotalView
                  paymentTools={{
                    createPaymentIntent: createPaymentIntent,
                    clientSecret: stripeElementOptions?.clientSecret,
                  }}
                ></TotalView>
              </Elements>
            )}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
