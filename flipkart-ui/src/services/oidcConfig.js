/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Sunday, 16th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */

import Keycloak from "keycloak-js";
import { WebStorageStateStore } from "oidc-client-ts";

const oidcConfig = {
  authority: "https://localhost/auth/realms/flipkart-clone",
  client_id: "flipkart-clone-ui",
  redirect_uri: window.location.href,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

export default oidcConfig;
