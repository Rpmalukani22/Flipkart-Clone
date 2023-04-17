/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { KeycloakContext } from "../App";
import { useAuth, hasAuthParams } from "react-oidc-context";

export default function useGetData(url, dependencies = []) {
  const auth = useAuth();
  const [response, setResponse] = useState();
  console.log("auth ", auth);
  console.log("token ", auth?.user?.access_token);
  useEffect(() => {
    if (auth.isAuthenticated) {
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${auth.user.access_token}`,
          },
        })
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          console.log(`Failed to Get response from ${url} error ${err}`);
        });
    }
  }, [...dependencies, auth]);
  return response;
}
