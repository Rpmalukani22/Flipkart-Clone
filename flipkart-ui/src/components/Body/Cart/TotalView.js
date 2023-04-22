import { useState, useEffect } from "react";

import { Box, Button, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";

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

const TotalView = () => {
  const cartItems = useSelector((state) => state);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = cartItems.reduce(
    (sum, item) => sum + (item.retailPrice - item.price) * item.quantity,
    0
  );
  return (
    <Box>
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
          <Price component="span">₹40</Price>
        </Typography>
        <TotalAmount>
          Total Amount
          <Price>₹{total + 40}</Price>
        </TotalAmount>
        <Discount>You will save ₹{discount - 40} on this order</Discount>
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
        >
          Place Order
        </Button>
      </Container>
    </Box>
  );
};

export default TotalView;
