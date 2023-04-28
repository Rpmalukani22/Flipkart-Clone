/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppBar, Badge, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Login from "./Login/Login";
import More from "./More/More";
import Search from "./Search/Search";
import { useSelector } from "react-redux";

export default function Header() {
  const cartItems = useSelector((state) => state);
  return (
    <AppBar position="sticky" className={styles["appbar"]}>
      <Toolbar className={styles["toolbar"]}>
        {/*----------------------------------- Flipkart Navbar Logo ---------------------------------------------------- */}
        <Box className={styles["logo-box"]}>
          <Link to="/">
            <img
              src="./flipkart-text-logo.png"
              className={styles["navbar-icon"]}
              alt="Flipkart Logo"
            />
          </Link>
          <Typography
            className={styles["icon-sublink"]}
            variant="caption"
            component="div"
          >
            <Link to="/flipkart-plus">
              Explore{" "}
              <span>
                Plus <img src="./flipkart-plus-logo.png"></img>
              </span>
            </Link>
          </Typography>
        </Box>

        {/*---------------------------------------------Navbar Searchbar---------------------------------------------*/}

        <Search />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 0,
          }}
          className={styles["nav-links"]}
        >
          {/*---------------------------------------------Navbar Login---------------------------------------------*/}
          <Login />
          {/*---------------------------------------------Become a Seller---------------------------------------------*/}
          <Link to="/become-a-seller" className={styles["nav-link"]}>
            Become a Seller
          </Link>
          {/*---------------------------------------------More---------------------------------------------*/}
          <More className={styles["nav-link"]} />
          {/*---------------------------------------------Cart---------------------------------------------*/}

          <Link to="/cart" className={styles["nav-link"]} style={{ gap: 5 }}>
            <span>Cart</span>

            <Badge
              badgeContent={cartItems.reduce((total,item)=>total+item.quantity,0)}
              sx={{
                "& .MuiBadge-badge": {
                  color: "white",
                  backgroundColor: "red",
                },
              }}
            >
              <ShoppingCartIcon
                sx={{ fontSize: "1.5rem", marginTop: "5%" }}
              />
            </Badge>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
