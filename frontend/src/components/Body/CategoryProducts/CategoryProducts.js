/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import React, { useEffect } from "react";

import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import useGetData from "../../../hooks/useGetData";
import styles from "./CategoryProducts.module.css";
import { Filters } from "./Filter/Filter";
import { ProductCard } from "./ProductCard/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function CategoryProducts() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = React.useState({
    size: 20,
    number: 1,
  });
  useEffect(() => {
    setPage({
      size: 20,
      number: 1,
    });
  }, [searchParams]);

  const handleChange = (event, value) => {
    setPage((prev) => {
      return { ...prev, number: value };
    });
  };
  const products = useGetData(
    `http://localhost:8080/products?pageSize=${page.size}&pageNumber=${
      page.number - 1
    }&sortBy=id&order=ASC&category=${searchParams.get("category") || ""}`,
    [page, searchParams]
  );

  return (
    <Grid container className={styles["container"]}>
      <Grid
        sm={2}
        xs={12}
        item
        // md={6}
        // lg={2}
        sx={{ boxShadow: 1 }}
        className={styles["filters-container"]}
      >
        <Filters />
      </Grid>
      <Grid
        container
        sx={{
          boxShadow: 1,
        }}
        className={styles["products-grid-container"]}
      >
        {/* <Grid container > */}
        {products?.["_embedded"]?.["productResponseList"] &&
          products?.["_embedded"]?.["productResponseList"].map(
            (product, index) => {
              return (
                <Grid
                  className={styles["products-container"]}
                  item
                  xs={12}
                  md={8}
                  lg={3}
                  key={product["id"]}
                >
                  <ProductCard
                    productUrl={product["_links"]["self"]["href"]}
                  ></ProductCard>
                </Grid>
              );
            }
          )}
        <Box className={styles["pagination-wrapper"]}>
          <Grid className={styles["pagination-grid"]}>
            <p className={styles["pagination-text"]}>
              Page 1 of {products?.["page"]?.["totalPages"]}
            </p>
            <Pagination
              count={products?.["page"]?.["totalPages"]}
              page={page.page}
              onChange={handleChange}
              color="primary"
            />
          </Grid>
        </Box>
        {/* </Grid> */}
      </Grid>
    </Grid>
  );
}
