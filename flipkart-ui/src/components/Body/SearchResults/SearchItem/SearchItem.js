import React from "react";
import useGetData from "../../../../hooks/useGetData";
import { urlService } from "../../../../services/urls";
import { Box, Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import styles from "./SearchItem.module.css";
import { getINR } from "../../ProductDetails/ProductDetails";

export default function SearchItem({ item }) {
  const product = useGetData(urlService.getProductById(item?.id));

  if (!product) return;
  return (
    <Grid container gap={1} sx={{ width: "100%" }}>
      <Grid
        item
        xs={2.5}
        sx={{
          //   border: "1px solid red",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={product?.imageUrlList[0]}
          alt={"search item image"}
          sx={{ width: "95%", p: 1, m: 1, maxHeight:300}}
        />
      </Grid>
      <Grid item xs={7} sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            // fontSize: "1rem",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: "break-all",
            whiteSpace: "nowrap",
          }}
        >
          {product.name}
        </Typography>
        <Box className={styles["product-ratings-assured-box"]}>
          {product?.["productSpecifications"]?.["rating"] > 0 && (
            <div className={styles["product-ratings"]}>
              <span style={{ fontWeight: "bold" }}>
                {product?.["productSpecifications"]?.["rating"]}
              </span>
              <StarIcon />
            </div>
          )}
          {product?.["productSpecifications"]?.["ratingReviewSummary"] && (
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", color: "#878787", margin: "1%" }}
            >
              {product?.["productSpecifications"]?.["ratingReviewSummary"]}
            </Typography>
          )}
          {product?.["productSpecifications"]?.["f_assured"] && (
            <Box
              component="img"
              className={styles["assured"]}
              alt="Flipkart assured"
              src="./flipkart-icons/flipkart-assured.png"
            />
          )}
        </Box>
        <Typography
          sx={{
            width: "100%",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical",
            background: "#fff",
            textAlign: "justify",
          }}
          variant="body1"
        >
          {item?.sourceAsMap?.description}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography variant="h6">{getINR(item.sourceAsMap.price)}</Typography>
          {product?.retailPrice &&
            product?.retailPrice > item.sourceAsMap.price && (
              <Typography
                variant="h6"
                sx={{ fontSize: "0.85rem", color: "#878787" }}
              >
                <del style={{ textDecoration: "line-through red" }}>
                  {getINR(product?.retailPrice)}
                </del>
                &nbsp;&nbsp;
                <span id={styles["discount-percent"]}>
                  {product?.["productSpecifications"]?.["discountPercentage"]
                    ? product?.["productSpecifications"]?.[
                        "discountPercentage"
                      ] + "% off"
                    : ""}
                </span>
              </Typography>
            )}
        </Box>
      </Grid>
    </Grid>
  );
}
