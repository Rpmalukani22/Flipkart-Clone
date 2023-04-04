/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import React from "react";
import styles from "./Login.module.css";
import {Link} from "react-router-dom";
import PopOverLink from "../../UtilityComponents/PopOverLink/PopOverLink";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
export default function Login() {
  const loginListItems = [
    { iconPath: "./login-popover-icons/my-profile.svg", text: "My Profile" },
    {
      iconPath: "./login-popover-icons/flipkart-plus.svg",
      text: "Flipkart Plus Zone",
    },
    { iconPath: "./login-popover-icons/orders.svg", text: "Orders" },
    { iconPath: "./login-popover-icons/wishlist.svg", text: "Wishlist" },
    { iconPath: "./login-popover-icons/giftcard.svg", text: "Gift Cards" },
    { iconPath: "./login-popover-icons/rewards.svg", text: "Rewards" },
  ];
  return (
    <PopOverLink
      id="loginPopOver"
      clickable={{
        clickableClassName: styles["login-button"],
        clickableText: "Login",
      }}
      rectangleBaseStyle={{ minWidth: 250, padding: 0 }}
      contentWrapperStyle={{ width: "100%" }}
    >
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List>
          <ListItem disablePadding>
            <Box sx={{ p: 2, width: "100%" }}>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.85rem",
                }}
              >
                <b>New Customer?</b>{" "}
                <Link
                  to="/signup"
                  style={{ textDecoration: "none" }}
                >
                  <b>SignUp</b>
                </Link>
              </Typography>
            </Box>
          </ListItem>
          <Divider />
          {loginListItems.map((item, index) => {
            return (
              <div key={item.text}>
                <ListItem disablePadding>
                  <ListItemButton disableRipple>
                    <img src={item.iconPath} />
                    <ListItemText primary={item.text} sx={{ ml: "5%" }} />
                  </ListItemButton>
                </ListItem>
                {index !== loginListItems.length - 1 ? <Divider /> : ""}
              </div>
            );
          })}
        </List>
      </Box>
    </PopOverLink>
  );
}
