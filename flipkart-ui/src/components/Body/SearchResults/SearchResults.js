import React, { useEffect, useState } from "react";
import styles from "./SearchResults.module.css";
import { Box, Grid } from "@mui/material";
import axios from "axios";

export default function SearchResults() {
  const [results, setResults] = useState();
  useEffect(() => {
    axios
      .post(
        "https://localhost/api/product-management/products/search/",
        {},
        {
          params: {
            query: "laptop",
            from: "0",
            size: "10",
            indices: "logstash-products",
          },
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Results ",res.data);
        setResults(res.data);
      })
      .catch((e) => {
        console.log("failed to fetch search results...", e);
      });
  }, []);

  return (
    <Grid container className={styles["page-wrapper"]}>
      <Grid item xs={3.6}>
        <Box className={`${styles["page-container"]}`}>Hello</Box>
      </Grid>
      <Grid item xs={8.4}>
        <Box className={`${styles["page-container"]}`} sx={{display:"flex","flexDirection":"column"}}>
          {results?.hits?.hits && results.hits.hits.map((item)=>{
            return <Box key={item.id} >
              
              {JSON.stringify(item)}
            </Box>
          })}
          </Box>
      </Grid>
    </Grid>
  );
}
