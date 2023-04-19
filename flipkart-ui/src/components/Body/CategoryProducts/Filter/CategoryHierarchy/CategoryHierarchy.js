/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import styles from "./CategoryHierarchy.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useGetData from "../../../../../hooks/useGetData";
import { useSearchParams } from "react-router-dom";
import { urlService } from "../../../../../services/urls";

export function CategoryHierarchy(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState(
    searchParams.get("category") || ""
  );
  useEffect(() => {
    if (currentCategory) setSearchParams({ category: currentCategory });
  }, [currentCategory]);

  useEffect(() => {
    if (currentCategory) setCurrentCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const [clickPath, setClickPath] = useState([]);
  useEffect(() => {
    if (currentCategory)
      setClickPath((prevPath) => {
        let findIdx = prevPath.indexOf(currentCategory);
        if (findIdx === -1) return [...prevPath, currentCategory];
        else {
          return prevPath.slice(0, findIdx + 1);
        }
      });
    else setClickPath([]);
  }, [currentCategory]);
  const response = useGetData(urlService.getSubcategories(currentCategory), [
    currentCategory,
  ],true);
  const getCategoryButtons = (category, disabled = false) => {
    return (
      <Button
        variant="button"
        key={category}
        disabled={disabled}
        className={styles["category-link-btn"]}
        disableRipple
        onClick={() => {
          setCurrentCategory(category);
        }}
      >
        <span style={clickPath.length > 0 ? { marginLeft: "10%" } : {}}>
          {category}
        </span>
      </Button>
    );
  };
  return (
    response && (
      <Box className={styles["container"]}>
        {clickPath &&
          clickPath.map((category, index) => {
            return (
              <Button
                variant="button"
                key={category}
                className={styles["category-link-btn"]}
                disableRipple
                onClick={() => {
                  setCurrentCategory(category);
                }}
              >
                <KeyboardArrowDownIcon />
                &nbsp;{category}
              </Button>
            );
          })}
        {response &&
          response.length > 0 &&
          response.map((category) => {
            return getCategoryButtons(category);
          })}
      </Box>
    )
  );
}
