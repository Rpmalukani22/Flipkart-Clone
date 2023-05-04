/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import React from "react";
import "./Admin.css";
import "rapidoc";
import { urlService } from "../../../services/urls";
import { useAuth } from "react-oidc-context";

export default function Admin() {
  const auth = useAuth();
  return (
    <rapi-doc
      spec-url={urlService.getApiSpecs()}
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
