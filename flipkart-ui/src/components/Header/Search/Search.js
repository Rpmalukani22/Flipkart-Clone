/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputBase, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}


const Search = () => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await axios.get(
        `https://localhost/api/product-management/products/search/autocomplete?prefix=${inputValue}`
      );
      setOptions(response.data);
    };

    fetchOptions();
  }, [inputValue]);

  return (
    <Autocomplete
      options={options}
      // sx={{
      //   ".autocomplete-root": { zIndex: 1000, position: "relative" },
      //   ".autocomplete-paper": {
      //     position: "absolute !important",
      //     zIndex: "1001 !important",
      //   },
      // }}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
        className={styles["search-bar"]}
          {...params}
          placeholder="Search for products, brands and more"
          onChange={(event) => debounce((event) => setInputValue(event.target.value))(event)}
        />
      )}
    />
  );
};

export default Search;
