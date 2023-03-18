import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";
import InboxIcon from "@mui/icons-material/MoveToInbox";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Link as MuiLink,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Pagination,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import useGetData from "../../../../hooks/useGetData";

function CategoryHierarchy(props) {
  const [currentCategory, setCurrentCategory] = useState(
    props.categoryName || ""
  );
  const [clickPath, setClickPath] = useState([]);
  useEffect(() => {
    setClickPath((prevPath) => {
      return [...prevPath, currentCategory];
    });
  }, [currentCategory]);
  const [prevList, setPrevList] = useState([]);
  const response = useGetData(
    `http://localhost:8080/categories/sub-categories${
      currentCategory ? "?category=" + currentCategory : ""
    }`,
    [currentCategory]
  );
  const getCategoryButtons = (category, disabled = false) => {
    return (
      <Button
        variant="button"
        key={category}
        disabled={disabled}
        onClick={() => {
          setPrevList(response);
          setCurrentCategory(category);
        }}
      >
        {category}
      </Button>
    );
  };
  return (
    response && (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        Current Path : {clickPath}
        {response &&
          response.length > 0 &&
          response.map((category) => {
            return getCategoryButtons(category);
          })}
        {/* <hr style={{border:'10px solid red'}}/> */}
        {response.length === 0 &&
          prevList.map((category) => {
            return getCategoryButtons(category, true);
          })}
      </Box>
    )
  );
}

function ProductCard(props) {
  const getINR = (number) => {
    return number.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
      style: "currency",
      currency: "INR",
    });
  };

  const product = useGetData(props.productUrl);
  return (
    <Card sx={{ maxWidth: 345, boxShadow: "none" }}>
      <CardHeader
        action={
          <IconButton disableRipple aria-label="settings">
            <FavoriteIcon sx={{ color: "#e0e0e0" }} />
          </IconButton>
        }
        // title="Card Title"
        // subheader="Subheader"
      />
      <CardMedia
        component="img"
        height="250"
        image={product?.["imageUrlList"]?.[0] || ""}
        alt="Product Image"
        sx={{ padding: "2%", objectFit: "contain" }}
      />
      <CardContent>
        <MuiLink
          gutterBottom
          component={Link}
          to={product?.["productUrl"] || ""}
        >
          {product?.["name"]}
        </MuiLink>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 1,
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "green",
              color: "white",
              display: "flex",
              maxWidth: "35px",
              borderRadius: 4,
              padding: "2px 4px",
              fontSize: "0.85rem",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "1% 0",
            }}
          >
            <span style={{ fontWeight: "bold" }}>
              {product?.["productSpecifications"]?.["rating"]}
            </span>
            <StarIcon
              style={{
                fontSize: "0.9rem",
              }}
            />
          </div>
          {product?.["productSpecifications"]?.["fAssured"] ? (
            <Box
              component="img"
              sx={{
                maxHeight: 21,
                maxWidth: 77,
              }}
              alt="Flipkart assured"
              src="./flipkart-icons/flipkart-assured.png"
            />
          ) : (
            ""
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 1,
            alignItems: "center",
          }}
        >
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
      </CardContent>
    </Card>
  );
}
export default function Filters() {
  const [open, setOpen] = React.useState(true);
  const [page, setPage] = React.useState({
    size: 20,
    number: 1,
  });
  const handleChange = (event, value) => {
    setPage((prev) => {
      return { ...prev, number: value };
    });
  };
  const products = useGetData(
    `http://localhost:8080/products?pageSize=${page.size}&pageNumber=${
      page.number - 1
    }&sortBy=id&order=ASC`,
    [page]
  );

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Grid container sx={{ display: "flex", background: "#F1F3F6" }}>
      <Grid
        sm={2}
        xs={12}
        item
        // md={6}
        // lg={2}
        sx={{
          boxShadow: 1,
          border: "0.5px solid #f0f0f0",
          minHeight: 1400,
          minWidth: 270,
          flexGrow: 1,
          flexBasis: 0,
          margin: "2% 0.3% 2% 1%",
          background: "white",
        }}
      >
        <Box>
          <Typography
            sx={{
              padding: 2,
              fontFamily: "Roboto, Arial, sans-serif",
              fontSize: 18,
            }}
            variant="h2"
          >
            Filters
          </Typography>
          <hr style={{ border: "1px solid #f0f0f0" }}></hr>
          <CategoryHierarchy categoryName=""></CategoryHierarchy>
          {/* <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                PICK A CATEGORY
              </ListSubheader>
            }
          >
            <ListItemButton disableRipple={true} onClick={handleClick}>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
          </List> */}
        </Box>
      </Grid>
      <Grid
        sm={9}
        xs={12}
        item
        sx={{
          boxShadow: 1,
          border: "0.5px solid #f0f0f0",
          flexBasis: 0,
          minHeight: 1400,
          flexGrow: 4,
          margin: "2% 2% 2% 0.2%",
        }}
      >
        <Grid container>
          {products?.["_embedded"]?.["productResponseList"] &&
            products?.["_embedded"]?.["productResponseList"].map(
              (product, index) => {
                return (
                  <Grid
                    style={{ background: "white" }}
                    item
                    xs={12}
                    md={8}
                    lg={3}
                    key={product["id"]}
                  >
                    <ProductCard
                      productUrl={product["_links"]["self"]["href"]}
                    ></ProductCard>
                  </Grid>
                );
              }
            )}
          <Box sx={{ background: "white", marginTop: 0.2, width: "100%" }}>
            <Grid
              sx={{
                padding: 2,
                display: "flex",
                alignItems: "center",
                width: "65%",
              }}
            >
              <p style={{ marginRight: "auto" }}>
                Page 1 of {products?.["page"]?.["totalPages"]}
              </p>
              <Pagination
                count={products?.["page"]?.["totalPages"]}
                page={
                  page.page
                }
                onChange={handleChange}
                color="primary"
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* <Box
          sx={{
            boxShadow: 2,
            width: "8rem",
            height: "5rem",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            p: 1,
            m: 1,
            borderRadius: 2,
            textAlign: "center",
            fontSize: "0.875rem",
            fontWeight: "700",
          }}
        >
          boxShadow: 2
        </Box>
        <Box
          sx={{
            boxShadow: 3,
            width: "8rem",
            height: "5rem",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            p: 1,
            m: 1,
            borderRadius: 2,
            textAlign: "center",
            fontSize: "0.875rem",
            fontWeight: "700",
          }}
        >
          boxShadow: 3
        </Box> */}
    </Grid>
  );
}
