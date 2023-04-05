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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flipkart.clone.productmanagement.dto.catalog.CategoryRequest;
import com.flipkart.clone.productmanagement.dto.catalog.CategoryResponse;
import com.flipkart.clone.productmanagement.service.catalog.CategoryService;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.constraints.Min;
import lombok.extern.slf4j.Slf4j;

@RestController
@Validated
@RequestMapping("/categories")
@Slf4j
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping(path = {"/id/{id}"},produces = MediaTypes.HAL_JSON_VALUE)
    public CategoryResponse getCategoryById(@PathVariable("id") String categoryId) {
        return categoryService.getCategoryById(categoryId);
    }

    @PostMapping
    public void createCategory(@RequestBody CategoryRequest categoryRequest) {
        categoryService.createCategory(categoryRequest);
        log.info("Category Created successfully!");
    }

    @GetMapping(produces = MediaTypes.HAL_JSON_VALUE)
    public PagedModel<EntityModel<CategoryResponse>> getCategories(
            @Min(1) @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @Min(0) @RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "order", defaultValue = "ASC", required = false) Direction order,
            @RequestParam(value = "rootCategory", defaultValue = "", required = false) String rootCategory,
            @Parameter(hidden = true) PagedResourcesAssembler<CategoryResponse> pagedResourcesAssembler) {
        return pagedResourcesAssembler.toModel(categoryService.getAllCategories(pageSize, pageNumber, sortBy, order, rootCategory));
    }

    @PostMapping("/_bulk")
    public void addCategories(@RequestBody List<CategoryRequest> categoryRequestList) {
        categoryService.bulkCreateCategories(categoryRequestList);
        log.info("Categories Created successfully!");
    }

    @GetMapping("/sub-categories")
    public List<String> getFirstOrderSubCategories(@RequestParam(value = "category", defaultValue = "", required = false) String category){
            return categoryService.getSubCategories(category);
    }

}

// TODO: Exception Handling with Status Codes