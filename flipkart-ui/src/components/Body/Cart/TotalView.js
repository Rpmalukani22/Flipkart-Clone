import {
  Box,
  Button,
  CircularProgress,
  Typography,
  styled,
} from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../features/cart/cartSlice";
import Swal from "sweetalert2";

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
  borderbottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
  color: #878787;
`;

const Container = styled(Box)`
  padding: 15px 24px;
  background: #fff;
  & > p {
    margin-bottom: 20px;
    font-size: 14px;
  }
`;

const Price = styled(Typography)`
  float: right;
`;

const TotalAmount = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  border-top: 1px dashed #e0e0e0;
  padding: 20px 0;
  border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Typography)`
  font-size: 16px;
  color: green;
`;

const TotalView = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isStripeLoading, setIsStripLoading] = useState(true);

  useEffect(() => {
    if (elements) {
      const element = elements?.getElement("payment");
      element?.on("ready", () => {
        setIsStripLoading(false);
      });
    }
  }, [elements]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = cartItems.reduce(
    (sum, item) => sum + (item.retailPrice - item.price) * item.quantity,
    0
  );
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // return_url: `${window.location.origin}/order-confirmation`,
      },
      redirect: "if_required",
    });

    if (result.error) {
      console.log(result.error.message);
      alert("Payment Failed!");
    } else {
      //payment success ... clear cart :)
      Swal.fire({
        title: "<strong>Your payment was successful!</strong>",
        icon: "success",
        html:
          "<span style='text-align:left'>Thank you for your purchase! Your order with ID " +
          Math.random().toString(8).slice(2) +
          " has been received and is being processed.<br/> Thank you again for shopping with us!",
      }).then(() => {
        window.location.href = "/";
      });

      handleClearCart();
    }
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const deliveryCharges = total > 0 ? 40 : 0;
  const grandTotal = total + deliveryCharges;
  return (
    <Box sx={{ width: "100%" }}>
      {" "}
      {/* className={classes.component}> */}
      <Header>
        <Heading>PRICE DETAILS</Heading>
      </Header>
      <Container>
        <Typography>
          Price ({cartItems?.length} item)
          <Price component="span">₹{total}</Price>
        </Typography>
        <Typography>
          Discount
          <Price component="span">-₹{discount}</Price>
        </Typography>
        <Typography>
          Delivery Charges
          <Price component="span">₹{deliveryCharges}</Price>
        </Typography>
        <TotalAmount>
          Total Amount
          <Price>₹{grandTotal}</Price>
        </TotalAmount>
        <Discount>You will save ₹{discount} on this order</Discount>
        {!props?.paymentTools?.clientSecret && (
          <Button
            sx={{
              "&": {
                backgroundColor: "#FB641B",
                color: "white",
                borderRadius: 0,
                width: 180,
                height: 56,
                margin: "2%",
              },
              "&:hover": {
                transform: "scale(1.1)",
                backgroundColor: "#FB641B",
              },
            }}
            onClick={() => {
              props?.paymentTools?.createPaymentIntent(grandTotal * 100, "inr");
            }}
            disableRipple
          >
            Place Order
          </Button>
        )}
        {props?.paymentTools?.clientSecret && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <form onSubmit={handleSubmit}>
              {isStripeLoading && <CircularProgress />}
              <PaymentElement id="payment-element" />
              {!isStripeLoading && (
                <Button
                  sx={{
                    "&": {
                      backgroundColor: "#FB641B",
                      color: "white",
                      borderRadius: 0,
                      margin: "3%",
                      marginTop: "5%",
                    },
                    "&:hover": {
                      transform: "scale(1.1)",
                      backgroundColor: "#FB641B",
                    },
                  }}
                  type="submit"
                  disabled={!stripe}
                >
                  Pay ₹{grandTotal}
                </Button>
              )}
            </form>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TotalView;
