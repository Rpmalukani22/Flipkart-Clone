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
import { useNavigate } from "react-router-dom";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const Search = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await axios.get(
        `https://localhost/api/product-management/products/search/autocomplete?prefix=${inputValue}&indices=monstache_products`
      );
      setOptions(response.data);
    };

    fetchOptions();
  }, [inputValue]);

  const debouncedSearchNavigate = debounce((value) => {
    setInputValue(value);
    navigate("/search", { state: { searchText: value } });
  });
  const handleInputChange = (event, value) => {
    debouncedSearchNavigate(value);
  };

  const handleSelectOption = (event, value) => {
    setInputValue(value);
    navigate("/search", { state: { searchText: value } });
  };

  return (
    <Autocomplete
      options={options}
      freeSolo={true}
      autoSelect={true}
      getOptionLabel={(option) => option}
      onChange={handleSelectOption}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          className={styles["search-bar"]}
          {...params}
          placeholder="Search for products, brands and more"
        />
      )}
    />
  );
};

export default Search;
