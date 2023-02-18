import React from "react";
import styles from "./Header.module.css";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }} className={styles["header-box"]}>
      <AppBar position="static" className={styles["app-bar"]}>
        <Toolbar style={{ paddingLeft: "0px" }}>
          <Box sx={{ flexDirection: "column" }} className={styles["icon-box"]}>
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
              className={styles["navbar-icon"]}
              alt="logo"
            />
            <Typography className={styles["icon-sublink"]} variant="caption" component="div">
              <a
                
                href="http://www.google.com"
              >
                Explore <span>Plus <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png"></img></span>
              </a>
            </Typography>
          </Box>
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
