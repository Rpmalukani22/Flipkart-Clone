import oidcConfig from "./oidcConfig";

/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
const product_management_endpoint = "localhost/api/product-management";
export const urlService = {
  getApiSpecs: () => `https://${product_management_endpoint}/v3/api-docs`,
  getBanners: () => `https://${product_management_endpoint}/site-content/banners`,
  getProducts: (page, category) =>
    `https://${product_management_endpoint}/products?pageSize=${
      page.size
    }&pageNumber=${page.number - 1}&sortBy=id&order=ASC&category=${category}`,
  getSubcategories: (category) =>
    `https://${product_management_endpoint}/categories/sub-categories${
      category ? "?category=" + category : ""
    }`,
  getBestOfDeals: () =>
    `https://${product_management_endpoint}/site-content/best-of-deals`,
  getProductBySlug: (slug) =>
    `https://${product_management_endpoint}/products/slug/${slug}`,
  getSignUpLink:()=>`${oidcConfig.authority}/protocol/openid-connect/registrations?client_id=flipkart-clone-ui&response_type=code&scope=openid%20email&redirect_uri=${encodeURI(oidcConfig.redirect_uri)}`
};
