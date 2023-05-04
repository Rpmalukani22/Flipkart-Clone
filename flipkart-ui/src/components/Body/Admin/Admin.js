/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import React, { useEffect, useRef } from "react";
import "./Admin.css";
import "rapidoc";
import { urlService } from "../../../services/urls";
import BlockIcon from "@mui/icons-material/Block";
import { useAuth } from "react-oidc-context";
import useGetData from "../../../hooks/useGetData";
import { Box, Typography } from "@mui/material";

export default function Admin() {
  const auth = useAuth();
  const spec = useGetData(urlService.getApiSpecs());
  const specRef = useRef();
  useEffect(() => {
    try {
      specRef.current.loadSpec(spec);
    } catch (e) {
      console.log("error", e);
    }
    console.log(specRef);
  }, [spec]);
  if (auth.isAuthenticated === false || (!spec)) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
      >
        <Typography
          sx={{ color: "#878787", display: "flex", alignItems: "center" }}
          variant="h2"
        >
          <BlockIcon fontSize="1rem" sx={{ m: 2 }} /> Access Denied. You have
          insufficient privileges.
        </Typography>
      </Box>
    );
  }
  return (
    <rapi-doc
      ref={specRef}
      loadSpec={() => spec}
      render-style="focused"
      show-header="false"
      show-info="false"
      regular-font="Roboto"
      primary-color="#2874F0"
      api-key-name="Authorization"
      api-key-location="header"
      api-key-value={`Bearer ${auth?.user?.access_token}`}
    />
  );
}
