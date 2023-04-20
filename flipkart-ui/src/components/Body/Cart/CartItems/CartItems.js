import { Box, Fab, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  clearCart,
  removeItem,
} from "../../../../features/cart/cartSlice";
import StarIcon from "@mui/icons-material/Star";
import styles from "./CartItems.module.css";
import { getINR } from "../../ProductDetails/ProductDetails";

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

  
  return cartItems.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <>
      {cartItems.map((item) => (
        <Grid
          sx={{
            p: 2,
            gap:1,
            m:1,
            width: "100%",
            height: "fit-content",
            border: "1px #c4c4c4 solid",
          }}
          container
          key={item.id}
        >
          <Grid
            item
            sx={{
              display: "flex",
              p: 2,
              flexDirection: "column",
              justifyContent: "center",
              width: "20%",
              height: "auto",
            }}
          >
            <Box sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
                <img
                  style={{ maxWidth: 112 }}
                  src={item?.imageUrlList[0]}
                ></img>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Fab
                    size="small"
                    sx={{
                      boxShadow: "none",
                      backgroundColor: "white",
                      border: "1px solid #c2c2c2",
                    }}
                    onClick={() => handleRemoveItem(item)}
                  >
                    -
                  </Fab>
                  <Typography>{item.quantity}</Typography>
                  <Fab
                    size="small"
                    sx={{
                      boxShadow: "none",
                      backgroundColor: "white",
                      border: "1px solid #c2c2c2",
                    }}
                    onClick={() => handleAddItem(item)}
                  >
                    +
                  </Fab>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              p: 2,
              // border: "1px solid blue",
              width: "60%",
              height: "auto",
            }}
          >
            <Typography sx={{ p: 1 }}>{item.name}</Typography>
            <Typography variant="subtitle2" sx={{ p: 1, color: "#878787" }}>
              Brand: {item?.brand}
            </Typography>
            <Box sx={{ p: 1, display: "flex", justifyContent: "flex-start" }}>
              <p
                className={styles["flipkart-text-450"]}
                style={{ padding: 0, margin: 0, color: "#878787" }}
              >
                Seller: {item?.productSpecifications?.seller?.sellerName}
              </p>
              {item?.["productSpecifications"]?.["f_assured"] ? (
                <Box
                  component="img"
                  className={styles["assured"]}
                  alt="Flipkart assured"
                  src="./flipkart-icons/flipkart-assured.png"
                />
              ) : (
                ""
              )}
            </Box>
            <Box sx={{ p: 1 }} className={styles["price-box"]}>
              {item?.["productSpecifications"]?.["discounted"] ? (
                <div>
                  <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                    {item?.["discountedPrice"] &&
                      getINR(item["discountedPrice"])}
                  </span>{" "}
                  &nbsp;
                  <span>
                    <del>
                      {item?.["retailPrice"] && getINR(item["retailPrice"])}
                    </del>
                  </span>{" "}
                  &nbsp;
                  <span style={{ color: "green", fontSize: "0.75rem" }}>
                    {item?.["productSpecifications"]?.["discountPercentage"]
                      ? item?.["productSpecifications"]?.[
                          "discountPercentage"
                        ] + "% off"
                      : ""}
                  </span>
                </div>
              ) : (
                <span>
                  {item?.["retailPrice"] && getINR(item["retailPrice"])}
                </span>
              )}
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              p: 2,
              // border: "1px solid blue",
              width: "5%",
              height: "auto",
            }}
          >
            <Box sx={{display:"flex",justifyContent:"center", flexDirection:"column",height:"100%"}}>
              <Typography sx={{ p: 1 }}>
                <b>{getINR(item.price * item.quantity)}</b>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
      {/* <p>Total: {total}</p>
      <button onClick={handleClearCart}>Clear Cart</button> */}
    </>
  );
}
