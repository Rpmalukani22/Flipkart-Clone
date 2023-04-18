/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import React from "react";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import Button from "@mui/material/Button";
import styles from "./PopOverLink.module.css";
import {
  usePopupState,
  bindHover,
  bindPopover,
} from "material-ui-popup-state/hooks";
import { Box } from "@mui/material";

const PopOverLink = (props) => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: props.id ? props.id : "demo",
  });

  let clickable = {
    clickableStyle: {},
    clickableClassName: "",
    clickableText: "Hover To Open PopOver"
  };
  if (props.clickable) clickable = { ...clickable, ...props.clickable };
  return (
    <div>
      <Button
        sx={clickable.clickableStyle}
        className={clickable.clickableClassName}
        variant="contained"
        {...bindHover(popupState)}
        onClick={clickable.onClick}
      >
        {clickable.clickableText}
      </Button>
      <HoverPopover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          className: styles["hover-popover"],
          sx: props.paperStyle,
        }}
      >
        <Box className={styles["rectangle-base"]} sx={props.rectangleBaseStyle}>
          <div
            className={styles["content-wrapper"]}
            style={props.contentWrapperStyle}
          >
            {props.children}
          </div>
        </Box>
      </HoverPopover>
    </div>
  );
};

export default PopOverLink;
