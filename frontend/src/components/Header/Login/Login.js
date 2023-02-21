import React from "react";
import styles from "./Login.module.css";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ListItemIcon from "@mui/icons-material/List";
import PopOverLink from "../../UtilityComponents/PopOverLink/PopOverLink";
import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
export default function Login() {
  return (
    <PopOverLink
      id="loginPopOver"
      clickable={{
        clickableClassName: styles["login-button"],
        clickableText: "Login",
      }}
      rectangleBaseStyle={{ minWidth: 250, padding: 0 }}
      contentWrapperStyle={{ width: "100%" }}
    >
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List>
          <ListItem disablePadding>
            <Box sx={{ p: 3, width: "100%" }}>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.85rem",
                }}
              >
                <b>New Customer?</b>{" "}
                <Link href="https://www.google.com" style={{textDecoration:'none'}}><b>SignUp</b></Link>
              </Typography>

              <Divider sx={{ marginTop: "20px" }} />
            </Box>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" sx={{ ml: "2%" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </PopOverLink>
  );
}
