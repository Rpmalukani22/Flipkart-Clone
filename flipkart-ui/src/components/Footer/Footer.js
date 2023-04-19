/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
// import React from "react";

// export default function Footer() {
//   return (
//     <div style={{ height: "50vh", display: "flex", alignItems: "flex-end" }}>
//       Footer
//     </div>
//   );
// }

import { Box, Grid, Link, List, ListItem, Typography } from "@mui/material";
import React from "react";
const footerLinks = {
  ABOUT: [
    "Contact Us",
    "About Us",
    "Careers",
    "Flipkart Stories",
    "Press",
    "Flipkart Wholesale",
    "Corporate Information",
  ],
  HELP: [
    "Payments",
    "Shipping",
    "Cancellation & Returns",
    "FAQ",
    "Report Infringement",
  ],
  "CONSUMER POLICY": [
    "Return Policy",
    "Terms Of Use",
    "Security",
    "Privacy",
    "Sitemap",
    "Grievance Redressal",
    "EPR Compliance",
  ],
  SOCIAL: ["Facebook", "Twitter", "YouTube"],
};

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#172337",
        padding: "30px",
        // marginTop: "20px",
        borderTop: "1px solid #e0e0e0",
        textAlign: "center",
        display:"flex"
      }}
    >
      <Grid container>
        {Object.keys(footerLinks).map((linkHeading) => {
          return (
            <Grid item xs={12} sm={6} md={1.75} sx={{ textAlign: "center" }} key={linkHeading}>
              <List>
                <ListItem>
                  <Link
                    variant="caption"
                    sx={{
                      color: "#878787",
                      fontSize: "0.75rem",
                      textDecoration: "none",
                    }}
                  >
                    {linkHeading}
                  </Link>
                </ListItem>
                {footerLinks[linkHeading].map((linkItem) => (
                  <ListItem sx={{ m: 0, py: 0 }} key={linkItem}>
                    <Link
                      variant="caption"
                      sx={{ color: "white", textDecoration: "none" }}
                    >
                      {linkItem}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>
          );
        })}
        <Grid item xs={12} sm={6} md={3} sx={{ pl:5,textAlign: "left",borderLeft:"1px solid #878787"}}>
          <List>
            <ListItem>
              <Link
                variant="caption"
                sx={{
                  color: "#878787",
                  fontSize: "0.75rem",
                  textDecoration: "none",
                }}
              >
                Mail Us:
              </Link>
            </ListItem>
            <ListItem>
              <Typography variant="caption" sx={{ color: "white" }}>
                Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
                Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli
                Village, Bengaluru, 560103, Karnataka, India
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={2} sx={{ textAlign: "left" }}>
          <List>
            <ListItem>
              <Link
                variant="caption"
                sx={{
                  color: "#878787",
                  fontSize: "0.75rem",
                  textDecoration: "none",
                }}
              >
                Registered Office Address:
              </Link>
            </ListItem>
            <ListItem>
              <Typography variant="caption" sx={{ color: "white"}}>
                Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
                Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli
                Village, Bengaluru, 560103, Karnataka, India<br/>
                CIN : U51109KA2012PTC066107<br/>
                Telephone: 044-45614700
              </Typography>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
