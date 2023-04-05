/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flipkart.clone.productmanagement.commons.exception.ProductNotFoundException;
import com.flipkart.clone.productmanagement.dto.catalog.ProductRequest;
import com.flipkart.clone.productmanagement.dto.catalog.ProductResponse;
import com.flipkart.clone.productmanagement.service.catalog.ProductService;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.constraints.Min;

@RestController
@Validated
@RequestMapping("/products")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("/id/{id}")
    public ProductResponse getProductById(@PathVariable String id) throws ProductNotFoundException {
        return productService.getProductById(id);
    }

    @GetMapping("/slug/{productSlug}")
    public ProductResponse getProductBySlug(@PathVariable String productSlug) throws ProductNotFoundException {
        return productService.getProductBySlug(productSlug);
    }

    @DeleteMapping("/id/{id}")
    public void removeProductById(@PathVariable String id) {
        productService.removeProductById(id);
    }

    @GetMapping(produces = MediaTypes.HAL_JSON_VALUE)
    public PagedModel<EntityModel<ProductResponse>> getProducts(
            @Min(1) @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @Min(0) @RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "order", defaultValue = "ASC", required = false) Direction order,
            @RequestParam(value = "category", defaultValue = "", required = false) String category,
            @Parameter(hidden = true) PagedResourcesAssembler<ProductResponse> pagedResourcesAssembler)
            throws ProductNotFoundException {
        return pagedResourcesAssembler
                .toModel(productService.getAllProducts(pageSize, pageNumber, sortBy, order, category));
    }

    @PostMapping
    public void addProduct(@RequestBody ProductRequest productRequest) {
        productService.createProduct(productRequest);
    }

    @PostMapping("/_bulk")
    public void addProducts(@RequestBody List<ProductRequest> productRequestList) {
        productService.bulkCreateProducts(productRequestList);
    }

    @DeleteMapping("/_bulk")
    public void removeProducts(@RequestParam List<String> productIdList) {
        productService.bulkRemoveProducts(productIdList);
    }
}

// TODO: Exception Handling with Status Codes