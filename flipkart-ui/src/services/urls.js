/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
const product_management_host = "localhost:8080";
export const urlService = {
  getApiSpecs: () => `http://${product_management_host}/v3/api-docs`,
  getBanners: () => `http://${product_management_host}/site-content/banners`,
  getProducts: (page, category) =>
    `http://${product_management_host}/products?pageSize=${
      page.size
    }&pageNumber=${page.number - 1}&sortBy=id&order=ASC&category=${category}`,
  getSubcategories: (category) =>
    `http://${product_management_host}/categories/sub-categories${
      category ? "?category=" + category : ""
    }`,
  getBestOfDeals: () =>
    `http://${product_management_host}/site-content/best-of-deals`,
  getProductBySlug: (slug) =>
    `http://${product_management_host}/products/slug/${slug}`,
};
