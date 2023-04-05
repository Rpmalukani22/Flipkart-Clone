/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import React from "react";

import styles from "./Home.module.css";

import { Box } from "@mui/material";
import useGetData from "../../../hooks/useGetData";
import { categoryNavigationImages } from "../../../services/constants";
import { urlService } from "../../../services/urls";
import BestOfDeal from "./BestOfDeal/BestOfDeal";
import CarouselWrapper from "./CarouselWrapper/CarouselWrapper";

export default function Home() {
  const banners = useGetData(urlService.getBanners());
  const bestOfDeals = useGetData(urlService.getBestOfDeals());

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
        <CarouselWrapper arrowVisiblitySettings={{ enabled: false }}>
          {banners?.map((banner) => {
            return (
              <img
                key={banner.id}
                id={banner.id}
                endpoint={banner.targetHref}
                src={banner.imgUrl}
              ></img>
            );
          })}
        </CarouselWrapper>
      </Box>

      {bestOfDeals &&
        bestOfDeals.map((deal) => {
          return (
            <Box
              key={String(Date.now()) + String(Math.random())}
              className={`${styles["home-container"]} ${styles["best-of-container"]}`}
            >
              <BestOfDeal deal={deal}></BestOfDeal>
            </Box>
          );
        })}
    </Box>
  );
}
