import { Box, Fab, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';import {
  addItem,
  clearCart,
  removeItem,
} from "../../../../features/cart/cartSlice";
import StarIcon from "@mui/icons-material/Star";
import styles from "./CartItems.module.css";
import { getINR } from "../../ProductDetails/ProductDetails";

export default function CartItems() {
  const cartItems = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return cartItems.length === 0 ? (
    <Box sx={{display:"flex",p:5,color:"#777",alignItems:"center",justifyContent:"center",textAlign:"center",width:"100%",minHeight:"60vh"}}>
      <h3> Your cart is empty Please add some items</h3>
      <AddReactionOutlinedIcon sx={{mx:1,fontSize:"2rem"}}/>
    </Box>
  ) : (
    <>
      {cartItems.map((item) => (
        <Grid
          sx={{
            p: 2,
            gap: 1,
            m: 1,
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
              width: "50%",
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
              width: "20%",
              height: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ p: 1, border: "1px solid #c4c4c4" }}>
                {item.price} X {item.quantity} ={" "}
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
