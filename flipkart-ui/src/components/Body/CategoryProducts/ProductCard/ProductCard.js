/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";
import styles from "./ProductCard.module.css";

export function ProductCard(props) {
  const [imgLoading, setImgLoading] = useState(true);
  const getINR = (number) => {
    return number.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
      style: "currency",
      currency: "INR",
    });
  };

  const product = useGetData(props.productUrl);
  // const imgLoader = ()=>
  return (
    <MuiLink
      sx={{ textDecoration: "none" }}
      component={Link}
      to={product?.["productUrl"] || ""}
    >
      <Card className={styles["container"]} sx={{ boxShadow: 0 }}>
        <CardHeader
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            justifySelf: "flex-start",
          }}
          action={
            <IconButton disableRipple aria-label="settings">
              <FavoriteIcon className={styles["fav-icon"]} />
            </IconButton>
          }
        />
        <CardMedia
          sx={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "0",
            flexGrow: "2",
            height: "90%",
            justifyContent: "flex-start",
          }}
        >
          {imgLoading && (
            <Box
              sx={{
                minHeight: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {
            <Box
              component="img"
              className={styles["img-container"]}
              onLoad={() => setImgLoading(false)}
              src={product?.["imageUrlList"]?.[0] || ""}
            ></Box>
          }
        </CardMedia>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            flexBasis: 0,
            flexGrow: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", px: 2.5 }}>
            <Typography
              variant="subtitle2"
              sx={{
                width: "100%",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                background: "#fff",
                textAlign: "left",
              }}
            >
              {product?.brand}
            </Typography>
            <Typography
              gutterBottom
              className={styles["product-title"]}
              sx={{
                width: "100%",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                background: "#fff",
                textAlign: "left",
              }}
            >
              {product?.["name"]}
            </Typography>
            <Box className={styles["product-ratings-assured"]}>
              {product?.["productSpecifications"]?.["rating"] > 0 && (
                <div className={styles["product-ratings"]}>
                  <span style={{ fontWeight: "bold" }}>
                    {product?.["productSpecifications"]?.["rating"]}
                  </span>
                  <StarIcon />
                </div>
              )}
              {product?.["productSpecifications"]?.["f_assured"] ? (
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
            <Box className={styles["price-box"]}>
              {product?.["productSpecifications"]?.["discounted"] ? (
                <div>
                  <span>
                    {product?.["discountedPrice"] &&
                      getINR(product["discountedPrice"])}
                  </span>{" "}
                  &nbsp;
                  <span>
                    <del>
                      {product?.["retailPrice"] &&
                        getINR(product["retailPrice"])}
                    </del>
                  </span>{" "}
                  &nbsp;
                  <span>
                    {product?.["productSpecifications"]?.["discountPercentage"]
                      ? product?.["productSpecifications"]?.[
                          "discountPercentage"
                        ] + "% off"
                      : ""}
                  </span>
                </div>
              ) : (
                <span>
                  {product?.["retailPrice"] && getINR(product["retailPrice"])}
                </span>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </MuiLink>
  );
}
