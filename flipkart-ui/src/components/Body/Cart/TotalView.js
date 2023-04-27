// import { useState, useEffect } from "react";

// import Stripe from "react-stripe-checkout";
// import axios from "axios";

// async function handleToken(token) {
//   console.log(token);
//   await axios.post("https://localhost/api/product-management/payment/charge", "", {         headers: {
//     token: token.id,
//     amount: 500,
//   },}).then(() => {
//      alert("Payment Success");
//      }).catch((error) => {
//      alert(error);
//      });
//   }

// import { Box, Button, Typography, styled } from "@mui/material";
// import { useSelector } from "react-redux";

// const Header = styled(Box)`
//   padding: 15px 24px;
//   background: #fff;
//   borderbottom: 1px solid #f0f0f0;
// `;

// const Heading = styled(Typography)`
//   color: #878787;
// `;

// const Container = styled(Box)`
//   padding: 15px 24px;
//   background: #fff;
//   & > p {
//     margin-bottom: 20px;
//     font-size: 14px;
//   }
// `;

// const Price = styled(Typography)`
//   float: right;
// `;

// const TotalAmount = styled(Typography)`
//   font-size: 18px;
//   font-weight: 600;
//   border-top: 1px dashed #e0e0e0;
//   padding: 20px 0;
//   border-bottom: 1px dashed #e0e0e0;
// `;

// const Discount = styled(Typography)`
//   font-size: 16px;
//   color: green;
// `;

// const TotalView = () => {
//   const cartItems = useSelector((state) => state);
//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const discount = cartItems.reduce(
//     (sum, item) => sum + (item.retailPrice - item.price) * item.quantity,
//     0
//   );
//   return (
//     <Box>
//       {" "}
//       {/* className={classes.component}> */}
//       <Header>
//         <Heading>PRICE DETAILS</Heading>
//       </Header>
//       <Container>
//         <Typography>
//           Price ({cartItems?.length} item)
//           <Price component="span">₹{total}</Price>
//         </Typography>
//         <Typography>
//           Discount
//           <Price component="span">-₹{discount}</Price>
//         </Typography>
//         <Typography>
//           Delivery Charges
//           <Price component="span">₹40</Price>
//         </Typography>
//         <TotalAmount>
//           Total Amount
//           <Price>₹{total + 40}</Price>
//         </TotalAmount>
//         <Discount>You will save ₹{discount - 40} on this order</Discount>
//         <Button
//           sx={{
//             "&": {
//               backgroundColor: "#FB641B",
//               color: "white",
//               borderRadius: 0,
//               width: 180,
//               height: 56,
//               margin: "2%",
//             },
//             "&:hover": {
//               transform: "scale(1.1)",
//               backgroundColor: "#FB641B",
//             },
//           }}
//         >
//           Place Order
//         </Button>
//         <Stripe
//           stripeKey="pk_test_51N12YcSDW5FA0noG1EEHM6FtiAOsG3QFv4g4jPKIjG31fVROViY9tHN15C4zp5fqfAJK9jSYNHwxkowLXDINeYTx00njchcWWL"
//           token={handleToken}
//         />
//       </Container>
//     </Box>
//   );
// };

// export default TotalView;

// import { useState } from "react";
// import StripeCheckout from "react-stripe-checkout";
// import { loadStripe } from "@stripe/stripe-js";
// import { PaymentElement } from "@stripe/react-stripe-js";

// function TotalView() {

//   // Handle the payment confirmation on the frontend
//   const handlePayment = async () => {
//     const stripe = await stripePromise;
//     const paymentIntent = await stripe
//       .confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: {
//             number: "4242424242424242",
//             exp_month: 12,
//             exp_year: 2022,
//             cvc: "123",
//           },
//           billing_details: {
//             name: "test",
//             email: "test@test.com",
//           },
//         },
//       })
//       .then((result) => {
//         if (result.error) {
//           // Show error to your customer (e.g., insufficient funds)
//           // The kind of error that could occur and how to ensure its updated.
//           // https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements#web-handle-errors
//           console.log(result.error.message);
//           alert("failed");
//         } else {
//           // The payment has been processed!
//           if (result.paymentIntent.status === "succeeded") {
//             alert("success");
//             // Show a success message to your customer
//             // There's a risk of the customer closing the window before callback
//             // execution. Webhook is setup for that.('/webhook')
//             // payment_intent.succeeded event that handles any business critical
//             // post-payment actions.
//           }
//         }
//       });
//   };

//   return (
//     <div>
//       {clientSecret && <button onClick={handlePayment}>pay!</button>}
//     </div>
//   );
// }

// export default TotalView;

import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const TotalView = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      alert("Error "+JSON.stringify(result.error))
      console.log(result.error.message);
    } else {
      alert("Success! ")
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  )
};

export default TotalView;