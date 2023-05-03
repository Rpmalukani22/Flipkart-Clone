import React, { useEffect, useState } from "react";
import styles from "./SearchResults.module.css";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
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
import useGetData from "../../../hooks/useGetData";
import FilterBox from "./FilterBox/FilterBox";

export default function SearchResults() {
  const [results, setResults] = useState();
  const location = useLocation();
  const [page, setPage] = useState({
    size: 10,
    number: 1,
  });
  const [filterAttr, setFilterAttr] = useState({ "brand.keyword": {}, });
  const [filterState, setFilterState] = useState({});
  const [sortAttr, setSortAttr] = useState("Relevance");
  const handlePageChange = (event, value) => {
    setPage((prev) => {
      return { ...prev, number: value };
    });
  };
  const handleFilterChange = (event, field) => {
    setFilterAttr((prev) => {
      const nxt = {
        ...prev,
        [field]: {
          ...prev[field],
          [event.target.name]: event.target.checked,
        },
      };
      if (!event.target.checked) delete nxt[field][event.target.name];
      return nxt;
    });
  };

  useEffect(() => {
    setPage({
      size: 10,
      number: 1,
    });
  }, [location.state.searchText]);
  useEffect(() => {
    for (let key of Object.keys(filterAttr)) {
      setFilterState((prev) => {
        if (Object.keys(filterAttr[key]).length > 0)
          return {
            ...prev,
            [key]: Object.keys(filterAttr[key]).map((filterAttrItem) => {
              if (filterAttrItem === "0") return false;
              else if (filterAttrItem === "1") return true;
              return filterAttrItem;
            }),
          };
        else {
          delete prev[key];
          return { ...prev };
        }
      });
    }
  }, [filterAttr]);
  useEffect(() => {
    axios
      .post(
        "https://localhost/api/product-management/products/search",
        filterState,
        {
          params:
            sortAttr && sortAttr != "Relevance"
              ? {
                  query: location.state.searchText,
                  from: `${(page.number - 1) * page.size}`,
                  size: `${page.size}`,
                  indices: "monstache_products",
                  sortField: sortAttr.split(";")[0],
                  sortOrder: sortAttr.split(";")[1],
                }
              : {
                  query: location.state.searchText,
                  from: `${(page.number - 1) * page.size}`,
                  size: `${page.size}`,
                  indices: "monstache_products",
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
  }, [location.state.searchText, page, sortAttr, filterState]);
  const brands = useGetData(
    `https://localhost/api/product-management/products/search/unique/brand.keyword?query=${location.state.searchText}&fields=brand&fields=categories&indices=monstache_products`,
    [location.state.searchText]
  );

  const assuredValues = useGetData(
    `https://localhost/api/product-management/products/search/unique/f_assured?query=${location.state.searchText}&fields=*&indices=monstache_products`,
    [location.state.searchText]
  );
  return (
    <Grid container className={styles["page-wrapper"]}>
      <Grid item xs={2.5}>
        <Box
          sx={{ display: "flex", flexDirection: "column", py: 1, px: 2 }}
          className={`${styles["page-container"]}`}
        >
          <Typography variant="h6" sx={{ p: 1 }}>
            Filters
          </Typography>
          <FilterBox
            items={brands}
            filterKey={"brand.keyword"}
            filterTitle={"Brand"}
            handleFilterChange={handleFilterChange}
          ></FilterBox>
          <FilterBox
            items={assuredValues}
            filterKey={"f_assured"}
            filterTitle={"Flipkart Assured"}
            handleFilterChange={handleFilterChange}
            isBoolean={true}
          ></FilterBox>
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
                onChange={(event) => setSortAttr(event.target.value)}
              >
                <MenuItem value="Relevance">Relevance</MenuItem>
                <MenuItem value="price;asc">Price Low to High</MenuItem>
                <MenuItem value="price;desc">Price High to Low</MenuItem>
                <MenuItem value="rating;desc">Ratings High to Low</MenuItem>
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
