import React, { useEffect, useState } from "react";
import styles from "./SearchResults.module.css";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import SearchItem from "./SearchItem/SearchItem";
import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const [results, setResults] = useState();
  const location = useLocation();
  console.log("Search text is ...", location.state.searchText);
  const [page, setPage] = useState({
    size: 10,
    number: 1,
  });
  const [sortAttr, setSortAttr] = useState("Relevance");
  const handlePageChange = (event, value) => {
    setPage((prev) => {
      return { ...prev, number: value };
    });
  };

  useEffect(() => {
    setPage({
      size: 10,
      number: 1,
    });
  }, [location.state.searchText]);
  useEffect(() => {
    axios
      .post(
        "https://localhost/api/product-management/products/search",
        {},
        {
          params: 
          sortAttr && sortAttr!="Relevance"
            ? {
                query: location.state.searchText,
                from: `${(page.number - 1) * page.size}`,
                size: `${page.size}`,
                indices: "monstache-products",
                sortField: sortAttr.split(";")[0],
                sortOrder: sortAttr.split(";")[1],
              }
            : 
            {
                query: location.state.searchText,
                from: `${(page.number - 1) * page.size}`,
                size: `${page.size}`,
                indices: "monstache-products",
              },
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Results ", res.data);
        setResults(res.data);
      })
      .catch((e) => {
        console.log("failed to fetch search results...", e);
      });
  }, [location.state.searchText, page, sortAttr]);

  return (
    <Grid container className={styles["page-wrapper"]}>
      <Grid item xs={2.5}>
        <Box className={`${styles["page-container"]}`}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Filters
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={9.5}>
        <Box
          className={`${styles["page-container"]}`}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ width: "15%", p: 2, alignSelf: "flex-end" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                id="sort-attr-select"
                value={sortAttr}
                defaultValue={sortAttr}
                label="Sort By"
                onChange={(event)=>setSortAttr(event.target.value)}
              >
                <MenuItem value="Relevance">Relevance</MenuItem>
                <MenuItem value="price;asc">Price Low to High</MenuItem>
                <MenuItem value="price;desc">Price High to Low</MenuItem>
                <MenuItem value="ratings;desc">Ratings High to Low</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {results?.hits?.hits &&
            results.hits.hits.map((item) => {
              return (
                <Box key={item.id}>
                  <SearchItem item={item} />
                </Box>
              );
            })}
          <Box className={styles["pagination-wrapper"]}>
            <Grid className={styles["pagination-grid"]}>
              <Pagination
                count={Math.ceil(
                  parseInt(results?.hits?.totalHits?.value) / 10 || 1
                )}
                page={page.number}
                onChange={handlePageChange}
                color="primary"
              />
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
