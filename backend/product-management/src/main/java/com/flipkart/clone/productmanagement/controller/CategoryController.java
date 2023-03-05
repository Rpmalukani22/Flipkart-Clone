package com.flipkart.clone.productmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flipkart.clone.commons.PageResponse;
import com.flipkart.clone.productmanagement.dto.CategoryRequest;
import com.flipkart.clone.productmanagement.dto.CategoryResponse;
import com.flipkart.clone.productmanagement.service.CategoryService;
import jakarta.validation.constraints.Min;

@RestController
@Validated
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping
    public PageResponse<CategoryResponse> getCategories(
            @Min(1) @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @Min(0) @RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "order", defaultValue = "ASC", required = false) Direction order) {
        return categoryService.getAllCategories(pageSize, pageNumber, sortBy, order);
    }

    @PostMapping("/_bulk")
    public void addCategories(@RequestBody List<CategoryRequest> categoryRequestList) {
        categoryService.bulkCreateCategories(categoryRequestList);
    }

}

// TODO: Exception Handling with Status Codes