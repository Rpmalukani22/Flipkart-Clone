package com.flipkart.clone.productmanagement.service;

import java.util.List;

import org.springframework.data.domain.Sort.Direction;

import com.flipkart.clone.productmanagement.dto.ProductRequest;
import com.flipkart.clone.productmanagement.dto.ProductResponse;

public interface ProductService {
    public List<ProductResponse> getAllProducts(int pageSize, int pageNumber, String sortBy, Direction order);

    public ProductResponse getProductById(String productId);

    public void createProduct(ProductRequest productRequest);

    public void bulkCreateProducts(List<ProductRequest> productRequestList);

    public void removeProductById(String productId);

    public void bulkRemoveProducts(List<String> productIdList);

}
