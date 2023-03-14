import React from "react";

import styles from "./Home.module.css";

import { Box } from "@mui/material";
import useGetData from "../../../hooks/useGetData";
import CarouselWrapper from "./CarouselWrapper/CarouselWrapper";

export default function Home() {
  const banners = useGetData("http://localhost:8080/site-content/banners");

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
        <CarouselWrapper>
          {banners?.map((banner) => {
            return (
              <img
                key={banner.id}
                endpoint={banner.targetHref}
                src={banner.imgUrl}
              ></img>
            );
          })}
        </CarouselWrapper>
      </Box>
    </Box>
  );
}
