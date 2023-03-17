import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useGetData(url,dependencies=[]) {
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
  },dependencies);
  return response;
}
