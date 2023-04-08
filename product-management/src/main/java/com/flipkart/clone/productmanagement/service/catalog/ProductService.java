/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.service.catalog;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort.Direction;

import com.flipkart.clone.productmanagement.commons.exception.ProductNotFoundException;
import com.flipkart.clone.productmanagement.dto.catalog.ProductRequest;
import com.flipkart.clone.productmanagement.dto.catalog.ProductResponse;

public interface ProductService {
    public Page<ProductResponse> getAllProducts(int pageSize, int pageNumber, String sortBy, Direction order,
            String category) throws ProductNotFoundException;

    public ProductResponse getProductById(String productId) throws ProductNotFoundException;

    public ProductResponse getProductBySlug(String productSlug) throws ProductNotFoundException;

    public void createProduct(ProductRequest productRequest);

    public void updateProduct(String productId, ProductRequest productRequest) throws ProductNotFoundException;

    public void bulkCreateProducts(List<ProductRequest> productRequestList);

    public void removeProductById(String productId);

    public void bulkRemoveProducts(List<String> productIdList);

}
