import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import CarouselWrapper from "../Home/CarouselWrapper/CarouselWrapper";
import styles from "./ProductDetails.module.css";
import StarIcon from "@mui/icons-material/Star";

export default function ProductDetails() {
  let { productSlug } = useParams();
  const getINR = (number) => {
    return number.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
      style: "currency",
      currency: "INR",
    });
  };
  const product = useGetData(
    `http://localhost:8080/products/slug/${productSlug}`
  );
  let categories = product?.categoryList.map((categoryPathObj) => {
    return categoryPathObj?.categoryPath
      ?.replace(/^(>>)+|(>>)+$/g, "")
      .split(">>");
  });
  return (
    <Grid
      container
      sx={{
        display: "flex",
        border: "1px solid red",
        padding: "3% 5%",
        background: "#F1F3F6",
      }}
    >
      <Grid
        sx={{
          minHeight: 1400,
          width: "40%",
          border: "1px solid green",
          background: "white",
        }}
      >
        <CarouselWrapper>
          {product?.imageUrlList.map((url) => {
            return <img key={url} src={url} />;
          })}
        </CarouselWrapper>
      </Grid>
      <Grid
        sx={{ border: "1px solid blue", width: "60%", background: "white" }}
      >
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            {categories &&
              categories?.map((categoryPathList) => {
                return categoryPathList.map((category, index) => {
                  if (index != categoryPathList.length - 1) {
                    return (
                      <Link
                        key={category}
                        underline="hover"
                        color="inherit"
                        href={`/categories?category=${category}`}
                      >
                        {category}
                      </Link>
                    );
                  } else
                    return (
                      <Typography color="text.primary">{category}</Typography>
                    );
                });
              })}
          </Breadcrumbs>
          <Typography variant="h6">{product?.name}</Typography>
          <div className={styles["product-ratings"]}>
            <span style={{ fontWeight: "bold" }}>
              {product?.["productSpecifications"]?.["rating"]}
            </span>
            <StarIcon />
          </div>
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
                  {product?.["productSpecifications"]?.["discountPercent"]
                    ? product?.["productSpecifications"]?.["discountPercent"] +
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
          <ul>
            <li className="offer">Available offers Bank Offer</li>
            <li className="offer">
              10% instant discount on SBI Credit Card EMI Transactions, up to
              ₹1500, on orders of ₹5,000 and aboveT&C{" "}
            </li>
            <li className="offer">
              Bank Offer 5% Cashback on Flipkart Axis Bank Card T&C{" "}
            </li>
            <li className="offer">
              Special Price Get extra 5% off (price inclusive of
              cashback/coupon)T&C{" "}
            </li>
            <li className="offer">
              Partner OfferSign up for Flipkart Pay Later and get Flipkart Gift
              Card worth up to ₹500*Know More
            </li>
          </ul>
          <Box>
           { product?.["description"]}
          </Box>
        </Box>

        {/* <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography> */}
      </Grid>
    </Grid>
  );
}
