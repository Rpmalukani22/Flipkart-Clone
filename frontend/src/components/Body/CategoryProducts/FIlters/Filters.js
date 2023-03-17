import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import useGetData from "../../../../hooks/useGetData";

function CategoryHierarchy(props) {
  const [currentCategory, setCurrentCategory] = useState(
    props.categoryName || ""
  );
  const [clickPath,setClickPath] = useState([]);
  useEffect(()=>{
    setClickPath((prevPath)=>{
      return [...prevPath,currentCategory];
    });
  },[currentCategory])
  const [prevList, setPrevList] = useState([]);
  const response = useGetData(
    `http://localhost:8080/categories/sub-categories${
      currentCategory ? "?category=" + currentCategory : ""
    }`,
    [currentCategory]
  );
  const getCategoryButtons = (category,disabled=false) => {
    return (
      <Button
        variant="button"
        key={category}
        disabled={disabled}
        onClick={() => {
          setPrevList(response);
          setCurrentCategory(category);
        }}
      >
        {category}
      </Button>
    );
  };
  return (
    response && (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        Current Path : {clickPath}
        {(response && response.length>0 && response.map((category)=>{return getCategoryButtons(category)}))}
        {/* <hr style={{border:'10px solid red'}}/> */}
        {response.length===0 && prevList.map((category)=>{return getCategoryButtons(category,true)})}
      </Box>
    )
  );
}
export default function Filters() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Grid container sx={{ display: "flex", background: "#F1F3F6" }}>
      <Box
        sx={{
          boxShadow: 1,
          border: "0.5px solid #f0f0f0",
          height: 1400,
          minWidth: 270,
          flexGrow: 1,
          flexBasis: 0,
          margin: "2% 0.3% 2% 1%",
          background: "white",
        }}
      >
        <Box>
          <Typography
            sx={{
              padding: 2,
              fontFamily: "Roboto, Arial, sans-serif",
              fontSize: 18,
            }}
            variant="h2"
          >
            Filters
          </Typography>
          <hr style={{ border: "1px solid #f0f0f0" }}></hr>
          <CategoryHierarchy categoryName=""></CategoryHierarchy>
          {/* <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                PICK A CATEGORY
              </ListSubheader>
            }
          >
            <ListItemButton disableRipple={true} onClick={handleClick}>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
          </List> */}
        </Box>
      </Box>
      <Box
        sx={{
          boxShadow: 1,
          border: "0.5px solid #f0f0f0",
          flexBasis: 0,
          height: 1400,
          flexGrow: 4,
          margin: "2% 2% 2% 0.2%",
          background: "white",
        }}
      >
        boxShadow: 1
      </Box>
      {/* <Box
          sx={{
            boxShadow: 2,
            width: "8rem",
            height: "5rem",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            p: 1,
            m: 1,
            borderRadius: 2,
            textAlign: "center",
            fontSize: "0.875rem",
            fontWeight: "700",
          }}
        >
          boxShadow: 2
        </Box>
        <Box
          sx={{
            boxShadow: 3,
            width: "8rem",
            height: "5rem",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            p: 1,
            m: 1,
            borderRadius: 2,
            textAlign: "center",
            fontSize: "0.875rem",
            fontWeight: "700",
          }}
        >
          boxShadow: 3
        </Box> */}
    </Grid>
  );
}
