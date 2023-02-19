import React from "react";
import styles from "./Header.module.css";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Search from "./Search/Search";

export default function Header() {
  return (
    <AppBar position="sticky" className={styles["appbar"]}>
      <Toolbar className={styles["toolbar"]}>
        {/*----------------------------------- Flipkart Navbar Logo ---------------------------------------------------- */}
        <Box className={styles["logo-box"]}>
          <img
            src="./flipkart-text-logo.png"
            className={styles["navbar-icon"]}
            alt="Flipkart Logo"
          />
          <Typography
            className={styles["icon-sublink"]}
            variant="caption"
            component="div"
          >
            <a href="http://www.google.com">
              Explore{" "}
              <span>
                Plus <img src="./flipkart-plus-logo.png"></img>
              </span>
            </a>
          </Typography>
        </Box>

        {/*---------------------------------------------Navbar Searchbar---------------------------------------------*/}

        <Search />

        {/*---------------------------------------------Navbar Links---------------------------------------------*/}

        <Box className={styles["nav-links"]}>
          <Button className={styles["login-button"]}>Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
