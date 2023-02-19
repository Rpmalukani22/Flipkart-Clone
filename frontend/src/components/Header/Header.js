import React from "react";
import styles from "./Header.module.css";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Search from "./Search/Search";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }} className={styles["header-box"]}>
      <AppBar position="static" className={styles["appbar"]}>
        <Toolbar className={styles["toolbar"]}>
          <Box sx={{ flexDirection: "column" }} className={styles["icon-box"]}>
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
          <Search />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
