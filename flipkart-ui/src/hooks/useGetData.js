/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

export default function useGetData(url, dependencies = [],returnIsLoading=false) {
  const auth = useAuth();
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (auth.isAuthenticated) {
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${auth.user.access_token}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setResponse(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(`Failed to Get response from ${url} error ${err}`);
        });
    } else {
      axios
        .get(url)
        .then((res) => {
          setIsLoading(false);
          setResponse(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(`Failed to Get response from ${url} error ${err}`);
        });
    }
  }, [...dependencies, auth]);
  if(!returnIsLoading)
  return response;
  else return [response,isLoading]
}
