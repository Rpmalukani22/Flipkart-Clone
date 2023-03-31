import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import styles from "./ProductCard.module.css";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Link } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";

export function ProductCard(props) {
  const getINR = (number) => {
    return number.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
      style: "currency",
      currency: "INR",
    });
  };

  const product = useGetData(props.productUrl);
  return (
    <MuiLink sx={{textDecoration:'none'}} component={Link} to={product?.["productUrl"] || ""}>
    <Card className={styles["container"]} sx={{ boxShadow: 0 }}>
      <CardHeader
        action={
          <IconButton disableRipple aria-label="settings">
            <FavoriteIcon className={styles["fav-icon"]} />
          </IconButton>
        }
      />
      <CardMedia
        component="img"
        image={product?.["imageUrlList"]?.[0] || ""}
        alt="Product Image"
        className={styles["img-container"]}
      />
      <CardContent>
        <Typography variant="subtitle2">{product?.brand}</Typography>
        <MuiLink
          gutterBottom
          component={Link}
          to={product?.["productUrl"] || ""}
          className={styles["product-title"]}
          >
          {product?.["name"]}
        </MuiLink>
        <Box className={styles["product-ratings-assured"]}>
          <div className={styles["product-ratings"]}>
            <span style={{ fontWeight: "bold" }}>
              {product?.["productSpecifications"]?.["rating"]}
            </span>
            <StarIcon />
          </div>
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
                  {product?.["retailPrice"] && getINR(product["retailPrice"])}
                </del>
              </span>{" "}
              &nbsp;
              <span>
                {product?.["productSpecifications"]?.["discountPercentage"]
                  ? product?.["productSpecifications"]?.["discountPercentage"] +
                    "% off"
                  : ""}
              </span>
            </div>
          ) : (
            <span>
              {product?.["retailPrice"] && getINR(product["retailPrice"])}
            </span>
          )}
        </Box>
      </CardContent>
    </Card>
    </MuiLink>
  );
}
