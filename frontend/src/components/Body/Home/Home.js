import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Carousel } from "react-responsive-carousel";

export default function Home() {
  const navigate = useNavigate();
  const handleCarouselImgClick = useCallback(
    (endPoint) => navigate(`${endPoint}`, { replace: false }),
    [navigate]
  );
  const bannerPaths = [
    {
      path: "./carousel-banners/1.infinix-smart-phone-dark.jpg",
      endpoint: "/footer",
    },
    { path: "./carousel-banners/2.intel-evo.jpg", endpoint: "/evo" },
    { path: "./carousel-banners/3.asus-monitors.jpg", endpoint: "/monitors" },
    {
      path: "./carousel-banners/4.purifiers,vaccumes,inverters.jpg",
      endpoint: "/inverters",
    },
    { path: "./carousel-banners/5.flipkart-flights.jpg", endpoint: "/flights" },
    { path: "./carousel-banners/6.sofas.jpg", endpoint: "/sofas" },
    { path: "./carousel-banners/7.flipkart-flights.jpg", endpoint: "/flights" },
    {
      path: "./carousel-banners/8.infinix-smart-phone-light.jpeg",
      endpoint: "/smartphones?id=bbaefewer-dfer5sfsdf-wfew-78520s",
    },
  ];

  const categoryNavigationImages = [
    { path: "./category-navigation-images/1.grocery.png", text: "Grocery" },
    { path: "./category-navigation-images/2.mobiles.png", text: "Mobiles" },
    { path: "./category-navigation-images/3.fashion.png", text: "Fashion" },
    {
      path: "./category-navigation-images/4.electronics.png",
      text: "Electronics",
    },
    { path: "./category-navigation-images/5.home.jpeg", text: "Home" },
    {
      path: "./category-navigation-images/6.appliances.png",
      text: "Appliances",
    },
    { path: "./category-navigation-images/7.travel.png", text: "Travel" },
    {
      path: "./category-navigation-images/8.top-offers.png",
      text: "Top Offers",
    },
    {
      path: "./category-navigation-images/9.beauty-toys-&-More.png",
      text: "Beauty Toys & More",
    },
    {
      path: "./category-navigation-images/10.two-wheelers.png",
      text: "Two Wheelers",
    },
  ];
  return (
    <Box className={styles["home-wrapper"]}>
      <Box className={`${styles["home-container"]} ${styles["category-nav"]} `}>
        {categoryNavigationImages.map((item) => {
          return (
            <Box className={styles["category-nav-item"]} key={item.path}>
              <img src={item.path}></img>
              <p>{item.text}</p>
            </Box>
          );
        })}
      </Box>
      <Box
        id={styles["carousel-container"]}
        className={styles["home-container"]}
      >
        <Carousel
          infiniteLoop={true}
          autoPlay={true}
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          stopOnHover={false}
          renderArrowPrev={(clickHandler, hasPrev) => {
            return (
              <div
                id={styles["carousel-arrow-left"]}
                className={styles["carousel-arrow"]}
                onClick={clickHandler}
              >
                <ChevronLeftIcon />
              </div>
            );
          }}
          renderArrowNext={(clickHandler, hasNext) => {
            return (
              <div
                id={styles["carousel-arrow-right"]}
                className={styles["carousel-arrow"]}
                onClick={clickHandler}
              >
                <ChevronRightIcon />
              </div>
            );
          }}
          onClickItem={(idx, item) => {
            handleCarouselImgClick(item.props.endpoint);
          }}
        >
          {bannerPaths.map((item) => {
            return (
              <img src={item.path} endpoint={item.endpoint} key={item.path} />
            );
          })}
        </Carousel>
      </Box>
    </Box>
  );
}
