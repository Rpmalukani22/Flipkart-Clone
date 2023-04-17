/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Sunday, 16th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */

import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://localhost/auth",
  realm: "flipkart-clone",
  clientId: "flipkart-clone-ui",
});


const oidcConfig = {
  authority: "https://localhost/auth/realms/flipkart-clone",
  client_id: "flipkart-clone-ui",
  redirect_uri: "https://localhost/",
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};

export default oidcConfig;
