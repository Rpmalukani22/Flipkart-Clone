/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import Box from "@mui/material/Box";
import React from "react";
import { Typography } from "@mui/material";
import styles from "./Filter.module.css";
import { CategoryHierarchy } from "./CategoryHierarchy/CategoryHierarchy";
import { useSearchParams } from "react-router-dom";

export function Filters() {
  return (
    <Box>
      <Typography className={styles["heading"]} variant="h2">
        Filters
      </Typography>
      <hr className={styles["line-break"]}></hr>
      <CategoryHierarchy></CategoryHierarchy>
    </Box>
  );
}
