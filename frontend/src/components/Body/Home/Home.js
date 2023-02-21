import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function Home() {
  const bannerPaths = [
    "./carousel-banners/1.infinix-smart-phone.jpg",
    "./carousel-banners/2.intel-evo.jpg",
    "./carousel-banners/3.asus-monitors.jpg",
    "./carousel-banners/4.purifiers,vaccumes,inverters.jpg",
    "./carousel-banners/5.flipkart-flights.jpg",
    "./carousel-banners/6.sofas.jpg",
    "./carousel-banners/7.flipkart-flights.jpg"
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        background: "#F1F3F6",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          borderBottom: "1px solid rgba(0,0,0,0.2)",
          borderboxShadow: " 0 1px 1px 0 rgba(0,0,0,.16)",
          background: "white",
        }}
      >
        <h1> Some Content</h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          borderboxShadow: " 0 1px 1px 0 rgba(0,0,0,.16)",
          background: "white",
        }}
      >
        <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false}>
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
