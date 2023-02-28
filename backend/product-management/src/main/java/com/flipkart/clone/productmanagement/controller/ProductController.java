package com.flipkart.clone.productmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flipkart.clone.productmanagement.dto.ProductRequest;
import com.flipkart.clone.productmanagement.dto.ProductResponse;
import com.flipkart.clone.productmanagement.service.ProductService;

import jakarta.validation.constraints.Min;

@RestController
@Validated
@RequestMapping("/products")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("/{id}")
    public ProductResponse getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    @DeleteMapping("/{id}")
    public void removeProducts(@PathVariable String id) {
        productService.removeProductById(id);
    }

    @GetMapping
    public List<ProductResponse> getProducts(
            @Min(1) @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @Min(0) @RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "order", defaultValue = "ASC", required = false) Direction order) {
        return productService.getAllProducts(pageSize, pageNumber, sortBy, order);
    }

    @PostMapping
    public void addProduct(@RequestBody ProductRequest productRequest) {
        productService.createProduct(productRequest);
    }

    @PostMapping("/bulk")
    public void addProducts(@RequestBody List<ProductRequest> productRequestList) {
        productService.bulkCreateProducts(productRequestList);
    }

    @DeleteMapping("/bulk")
    public void removeProducts(@RequestParam List<String> productIdList) {
        productService.bulkRemoveProducts(productIdList);
    }
}

// TODO: Exception Handling with Status Codes