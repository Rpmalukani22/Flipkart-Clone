/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import React from "react";
import styles from "./Search.module.css";
import { Box } from "@mui/system";
import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <InputBase
      placeholder="Search for products, brands and more"
      className={styles["search-bar"]}
      endAdornment={
        <IconButton className={styles["search-button"]}>
          <SearchIcon className={styles["search-icon"]} />
        </IconButton>
      }
    />
  );
}
