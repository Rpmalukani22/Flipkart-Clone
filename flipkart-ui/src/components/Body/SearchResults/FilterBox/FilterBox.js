import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./FilterBox.module.css";

export default function FilterBox({
  items,
  filterKey,
  filterTitle,
  handleFilterChange,
  isBoolean,
}) {
  const [showMore, setShowMore] = useState(false);
  const maxDisplayCount = 5;
  const visibleItems = showMore ? items : items?.slice(0, maxDisplayCount);
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ px: 1, fontSize: "1rem" }}>
        {capitalize(filterTitle)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "500px",
          overflowY: "auto",
          p: 1,
          mx: 1,
          fontSize: "0.9rem",
        }}
        className={styles["custom-scrollbar"]}
      >
        {visibleItems &&
          visibleItems.map((filterItem) => {
            const key = Object.keys(filterItem)[0];
            return (
              <FormGroup key={key}>
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      name={key}
                      value={`${!isBoolean ? key : parseInt(key)>0 ? true : false}`}
                      onChange={(event) => handleFilterChange(event, filterKey)}
                    />
                  }
                  label={`${!isBoolean ? key : parseInt(key)>0 ? "yes" : "no"} (${
                    filterItem[key]
                  })`}
                />
              </FormGroup>
            );
          })}
        {items?.length > maxDisplayCount && (
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button sx={{ p: 0, my: 1 }} disableRipple onClick={toggleShowMore}>
              {!showMore ? "More..." : "Less"}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
