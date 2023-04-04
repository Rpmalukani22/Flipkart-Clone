/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import React from "react";
import './Admin.css'
import "rapidoc";

export default function Admin() {
  return (
    <rapi-doc
      spec-url="http://localhost:8080/v3/api-docs"
      render-style="focused"
      show-header="false"
      show-info="false"
      regular-font = "Roboto"
      primary-color = "#2874F0"
    />
  );
}
