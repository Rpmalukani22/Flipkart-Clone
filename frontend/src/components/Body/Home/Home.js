import React from "react";
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
  const bannerPaths = [
    "./carousel-banners/1.infinix-smart-phone-dark.jpg",
    "./carousel-banners/2.intel-evo.jpg",
    "./carousel-banners/3.asus-monitors.jpg",
    "./carousel-banners/4.purifiers,vaccumes,inverters.jpg",
    "./carousel-banners/5.flipkart-flights.jpg",
    "./carousel-banners/6.sofas.jpg",
    "./carousel-banners/7.flipkart-flights.jpg",
    "./carousel-banners/8.infinix-smart-phone-light.jpeg",
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
      <Box className={styles["home-container"]}>
        <Carousel
          sx={{ position: "relative" }}
          infiniteLoop={true}
          autoPlay={true}
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          renderArrowPrev={(clickHandler, hasPrev) => {
            return (
              <div
                style={{
                  position: "absolute",
                  width: 50,
                  height: 50,
                  zIndex: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  // border: "10px solid red",
                  background: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={clickHandler}
              >
                <ChevronLeftIcon />
              </div>
            );
          }}
          renderArrowNext={(clickHandler, hasNext) => {
            return (
              <div
                style={{
                  position: "absolute",
                  width: 50,
                  height: 50,
                  lineHeight: 50,
                  zIndex: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  // border: "10px solid red",
                  background: "white",
                  right: 0,
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={clickHandler}
              >
                <ChevronRightIcon />
              </div>
            );
          }}
        >
          {bannerPaths.map((path) => {
            return (
              <div key={path}>
                <img src={path} />
              </div>
            );
          })}
        </Carousel>
      </Box>
    </Box>
  );
}
