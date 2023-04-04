/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PopOverLink from "../../UtilityComponents/PopOverLink/PopOverLink";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
export default function More(props) {
  const moreListItems = [
    {
      iconPath: "/more-popover-icons/notification-preferences.svg",
      text: "Notification Preferences",
    },
    {
      iconPath: "./more-popover-icons/24x7-customer-care.svg",
      text: "24X7 Customer Care",
    },
    {
      iconPath: "./more-popover-icons/advertise.svg",
      text: "Advertise",
    },
    { iconPath: "./more-popover-icons/download-app.svg", text: "Download App" },
  ];
  return (
    <PopOverLink
      id="morePopOver"
      clickable={{
        clickableClassName: props.className,
        clickableText:<>More <ExpandMoreIcon sx={{fontSize:"0.95rem"}}/></>,
      }}
      rectangleBaseStyle={{ minWidth: 250, padding: 0 }}
      contentWrapperStyle={{ width: "100%" }}
    >
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List>
          {moreListItems.map((item, index) => {
            return (
              <div key={item.text}>
                <ListItem disablePadding>
                  <ListItemButton disableRipple>
                    <img src={item.iconPath} />
                    <ListItemText primary={item.text} sx={{ ml: "5%" }} />
                  </ListItemButton>
                </ListItem>
                {index !== moreListItems.length - 1 ? <Divider /> : ""}
              </div>
            );
          })}
        </List>
      </Box>
    </PopOverLink>
  );
}
