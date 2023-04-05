/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetData(url, dependencies = []) {
  const [response, setResponse] = useState();
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(`Failed to Get response from ${url} error ${err}`);
      });
  }, dependencies);
  return response;
}
