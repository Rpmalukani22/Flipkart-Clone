import React from "react";
import More from "./More/More";
import Search from "./Search/Search";
import Login from "./Login/Login";
import styles from "./Header.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

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

          <Link to="/cart" className={styles["nav-link"]} style={{gap:5}}>
            <ShoppingCartIcon  sx={{fontSize:"1.5rem",marginTop:"5%"}}/>
            Cart
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
