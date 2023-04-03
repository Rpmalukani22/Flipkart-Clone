import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Breadcrumbs,
  Button,
  Grid,
  Hidden,
  ImageList,
  ImageListItem,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  Typography,
  createStyles,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import CarouselWrapper from "../Home/CarouselWrapper/CarouselWrapper";
import styles from "./ProductDetails.module.css";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarIcon from "@mui/icons-material/Star";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

export default function ProductDetails() {
  let { productSlug } = useParams();
  let { currentImgIndex, setCurrentImgIndex } = useState(0);

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
          position: "relative",
          // "&:hover:before": {
          //   content:"''",
          //   backgroundImage: `url('${product?.imageUrlList[currentImgIndex]}')`,
          //   position: "absolute",
          //   zIndex: 25,
          //   backgroundColor: "white",
          //   border: "1px solid #2874F0",
          //   width: "100%",
          //   minHeight: "100%",
          //   left: "100%",
          // },
        }}
        className={`${styles["display-img"]}`}
      >
        <Box style={{ position: "sticky", top: 56, left: 0, width: "100%" }}>
          <CarouselWrapper
            carouselSettings={{
              autoPlay: {},
              modules: [],
              // onActiveIndexChange:(swiper)=>{
              //   alert(swiper.activeIndex)
              //   setCurrentImgIndex(swiper.activeIndex)
              // }
            }}
          >
            {product?.imageUrlList.map((url) => {
              return (
                <img
                  style={{
                    objectFit: "contain",
                    height: "100%",
                    width: "100%",
                  }}
                  key={url}
                  src={url}
                />
              );
            })}
          </CarouselWrapper>
        </Box>
      </Grid>
      <Grid className={styles["details"]}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            {categories &&
              categories?.map((categoryPathList) => {
                return categoryPathList.map((category, index) => {
                  if (index !== categoryPathList.length - 1) {
                    return (
                      <Link
                        key={category}
                        underline="hover"
                        color="inherit"
                        sx={{ fontSize: "0.75rem" }}
                        href={`/categories?category=${category}`}
                      >
                        {category}
                      </Link>
                    );
                  } else
                    return (
                      <Typography
                        sx={{ fontSize: "0.75rem" }}
                        color="text.primary"
                      >
                        {category}
                      </Typography>
                    );
                });
              })}
          </Breadcrumbs>
          <Typography variant="h6" sx={{ fontSize: "1rem", color: "#878787" }}>
            {product?.brand.replace(
              categories ? categories[0][categories[0].length - 1] : "",
              ""
            )}
          </Typography>
          <Typography variant="h6" className={styles["product-name"]}>
            {product?.name}
          </Typography>
          <Box className={styles["price-box"]}>
            {product?.["productSpecifications"]?.["discounted"] ? (
              <div>
                <span id={styles["price"]}>
                  {product?.["discountedPrice"] &&
                    getINR(product["discountedPrice"])}
                </span>{" "}
                &nbsp;
                <span id={styles["del-price"]}>
                  <del>
                    {product?.["retailPrice"] && getINR(product["retailPrice"])}
                  </del>
                </span>{" "}
                &nbsp;
                <span id={styles["discount-percent"]}>
                  {product?.["productSpecifications"]?.["discountPercentage"]
                    ? product?.["productSpecifications"]?.[
                        "discountPercentage"
                      ] + "% off"
                    : ""}
                </span>
              </div>
            ) : (
              <span>
                {product?.["retailPrice"] && (
                  <span id={styles["price"]}>
                    {" "}
                    getINR(product["retailPrice"])
                  </span>
                )}
              </span>
            )}
          </Box>
          <Box className={styles["product-ratings-assured-box"]}>
            <div className={styles["product-ratings"]}>
              <span style={{ fontWeight: "bold" }}>
                {product?.["productSpecifications"]?.["rating"]}
              </span>
              <StarIcon />
            </div>
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
          <Typography variant="h6" component="div">
            Available offers
          </Typography>
          <List dense={true}>
            {product?.productSpecifications?.availableOffers.map((offer) => (
              <ListItem key={offer} sx={{ p: 0 }}>
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  <LocalOfferIcon sx={{ color: "#16BD49" }} />
                </ListItemIcon>
                <p style={{ padding: 0, margin: 0 }}>
                  {offer.slice(0, offer.length - 1).join(" ")}{" "}
                  <Link>{offer[offer.length - 1]}</Link>
                </p>
              </ListItem>
            ))}
          </List>
          {/* <ul>
            
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
          </ul> */}
          {product?.productSpecifications?.colorImgUrls?.length > 0 && (
            <Table style={{ margin: "2%" }}>
              <tbody>
                <tr>
                  <td
                    rowSpan={1}
                    style={{
                      color: "#878787",
                      fontFamily: "Roboto",
                      fontWeight: 450,
                    }}
                  >
                    Colors
                  </td>
                  <td>
                    <ImageList
                      sx={{
                        width: "100%",
                        height: "100%",
                        px: "2%",
                        margin: 0,
                        display: "flex",
                        flexFlow: "row wrap",
                      }}
                      cols={product?.productSpecifications?.colorImgUrls.length}
                      rows={1}
                      rowHeight={100}
                    >
                      {product?.productSpecifications?.colorImgUrls?.map(
                        (url, index) => (
                          <Button sx={{ p: 0, m: 0 }} key={url}>
                            <ImageListItem
                              className={index === 0 ? styles["color-img"] : ""}
                              style={{
                                width: "80%",
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              <img
                                style={{
                                  maxHeight: "100%",
                                  objectFit: "contain",
                                }}
                                src={`${url}`}
                                srcSet={`${url}`}
                                alt={url}
                                loading="lazy"
                              />
                            </ImageListItem>
                          </Button>
                        )
                      )}
                    </ImageList>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
          <Box
            sx={{
              margin: "2% 0",
            }}
          >
            <Typography variant="h6" component="div">
              Product Description
            </Typography>
            <Box
              sx={{
                textAlign: "justify",
                margin: "1% 2%",
              }}
            >
              <p>{product?.["description"]}</p>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              margin: "2%",
            }}
          >
            <Table
              className={styles["seller-box"]}
              style={{ maxWidth: "50%", margin: "1% 0", fontSize: "0.9rem" }}
            >
              <tbody>
                <tr>
                  <td
                    valign="top"
                    rowSpan={1}
                    style={{
                      color: "#878787",
                      fontFamily: "Roboto",
                      fontWeight: 450,
                      fontSize: "1rem",
                    }}
                  >
                    Seller
                  </td>
                  <td valign="top">
                    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                      <p
                        className={styles["flipkart-text-450"]}
                        style={{ padding: 0, margin: 0 }}
                      >
                        {product?.productSpecifications?.seller?.sellerName}
                      </p>
                      <div className={styles["seller-ratings"]}>
                        <span style={{ fontWeight: "bold", cursor: "pointer" }}>
                          {product?.productSpecifications?.seller?.sellerRating}
                        </span>
                        <StarIcon />
                      </div>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td valign="top">
                    <Link
                      style={{
                        fontSize: "0.85rem",
                        textDecoration: "underline",
                      }}
                      className={styles["flipkart-text-450"]}
                    >
                      See Other Sellers
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table
              className={styles["service-box"]}
              style={{ maxWidth: "50%", margin: "1% 0" }}
            >
              <tbody>
                <tr>
                  <td
                    valign="top"
                    rowSpan={1}
                    style={{
                      color: "#878787",
                      fontFamily: "Roboto",
                      fontWeight: 450,
                      fontSize: "1rem",
                    }}
                  >
                    Services
                  </td>
                  <td valign="top">
                    <List dense={false} sx={{ p: 0, m: 0 }}>
                      {product?.productSpecifications?.services?.map(
                        (serviceText) => (
                          <ListItem
                            key={product?.id + serviceText}
                            sx={{ p: 0, mb: 1 }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography
                                sx={{ lineHeight: "unset", fontSize: "0.9rem" }}
                              >
                                {serviceText}
                              </Typography>
                              <Button
                                disableRipple
                                sx={{
                                  p: 0,
                                  minWidth: 0,
                                  ml: 1,
                                  justifyContent: "center",
                                  alignSelf: "center",
                                  border: "1px solid #878787",
                                  borderRadius: "50%",
                                  height: "0.8rem",
                                }}
                              >
                                <QuestionMarkIcon
                                  sx={{ height: "0.8rem", fontSize: "0.8rem" }}
                                />
                              </Button>
                            </Box>
                          </ListItem>
                        )
                      )}
                    </List>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Box>
          {product?.productSpecifications?.highlights?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                margin: "2%",
              }}
            >
              <Table
                className={styles["highlight-box"]}
                style={{ maxWidth: "100%", margin: "1% 0" }}
              >
                <tbody>
                  <tr>
                    <td
                      valign="top"
                      rowSpan={1}
                      style={{
                        color: "#878787",
                        fontFamily: "Roboto",
                        fontWeight: 450,
                        fontSize: "1rem",
                      }}
                    >
                      highlights
                    </td>
                    <td valign="top">
                      <List dense={false} sx={{ p: 0, m: 0 }}>
                        {product?.productSpecifications?.highlights?.map(
                          (highlightText) => (
                            <ListItem
                              key={product?.id + highlightText}
                              sx={{ p: 0, ml: 2, mb: 1 }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <Typography
                                  sx={{
                                    lineHeight: "unset",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  {highlightText}
                                </Typography>
                              </Box>
                            </ListItem>
                          )
                        )}
                      </List>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {product?.productSpecifications?.details && (
              <Accordion style={{ boxShadow: "none" }}
              >
                <AccordionSummary
                  expandIcon={"V"}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Product Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Table style={{border: "1px solid #878787"}}>
                    <tbody>
                      {Object.keys(product?.productSpecifications?.details).map(
                        (key) => {
                          return (
                            <tr key={product?.id + key}>
                              <td><b>{key}</b></td>
                              <td>
                                {product?.productSpecifications?.details[key]}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </Table>
                </AccordionDetails>
              </Accordion>
            )}

            {product?.productSpecifications?.specs &&
              Object.keys(product?.productSpecifications?.specs).map(
                (tableName) => {
                  return (
                    <Accordion
                      style={{ boxShadow: "none" }}
                      key={product?.id + tableName}
                    >
                      <AccordionSummary
                        expandIcon={"V"}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{tableName}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Table>
                          <tbody>
                            {product?.productSpecifications?.specs[
                              tableName
                            ].data.map((dataItem) => {
                              return (
                                <tr key={product?.id + dataItem}>
                                  {dataItem.map((colItem,index) => {
                                    return (
                                      <td key={product?.id + colItem}>
                                        {(index===0 && dataItem.length>1)?<span style={{fontFamily:"Roboto",fontWeight:450}}>{colItem}</span>:colItem}
                                      </td>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
              )}
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
