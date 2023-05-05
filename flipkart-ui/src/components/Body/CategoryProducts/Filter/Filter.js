/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { CategoryHierarchy } from "./CategoryHierarchy/CategoryHierarchy";
import styles from "./Filter.module.css";

export function Filters() {
  return (
    <Box sx={{width:"100%"}}>
      <Typography className={styles["heading"]} variant="h2">
        Filters
      </Typography>
      <hr className={styles["line-break"]}></hr>
      <CategoryHierarchy></CategoryHierarchy>
    </Box>
  );
}
