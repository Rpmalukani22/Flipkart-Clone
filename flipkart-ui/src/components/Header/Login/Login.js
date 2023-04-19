/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PopOverLink from "../../UtilityComponents/PopOverLink/PopOverLink";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAuth } from "react-oidc-context";
export default function Login() {
  const auth = useAuth();
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
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <PopOverLink
      id="loginPopOver"
      clickable={{
        clickableClassName: !auth.isAuthenticated
          ? styles["login-button"]
          : styles["my-account"],
        clickableText: !auth.isAuthenticated ? (
          "Login"
        ) : (
          <>
            {!auth.isAuthenticated ? (
              "My Account"
            ) : (
              <>
                <AccountCircleIcon sx={{ color: "white", m: 0.5, mt: 0.7 }} />
                {`Hey ${capitalize(auth.user?.profile.given_name)}`}
              </>
            )}{" "}
            <ExpandMoreIcon sx={{ mt: 0.3 }} />
          </>
        ),
        onClick: () => {
          if (!auth.isAuthenticated) auth.signinRedirect();
        },
      }}
      rectangleBaseStyle={{ minWidth: 250, padding: 0 }}
      contentWrapperStyle={{ width: "100%" }}
    >
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List>
          {!auth.isAuthenticated && (
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
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <b>SignUp</b>
                  </Link>
                </Typography>
              </Box>
            </ListItem>
          )}
          {!auth.isAuthenticated && <Divider />}
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
          {auth.isAuthenticated && (
            <>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton
                  disableRipple
                  onClick={() => {
                    auth.signoutRedirect();
                  }}
                >
                  <PowerSettingsNewIcon sx={{ color: "#2874F0" }} />
                  <ListItemText primary="Logout" sx={{ ml: "5%" }} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </PopOverLink>
  );
}
