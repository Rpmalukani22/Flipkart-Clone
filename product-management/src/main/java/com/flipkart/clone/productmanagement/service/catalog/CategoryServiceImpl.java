/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.service.catalog;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Service;

import com.flipkart.clone.productmanagement.controller.CategoryController;
import com.flipkart.clone.productmanagement.dto.catalog.CategoryRequest;
import com.flipkart.clone.productmanagement.dto.catalog.CategoryResponse;
import com.flipkart.clone.productmanagement.model.catalog.Category;
import com.flipkart.clone.productmanagement.repository.catalog.CategoryRepository;
import com.github.slugify.Slugify;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    // Mappers
    private String getCategoryPathFromCategoryRequest(CategoryRequest categoryRequest) {
        List<String> categories = Arrays.asList(categoryRequest.getCategoryPath().split(">>")).stream()
                .map(String::trim).toList();
        String categoryPath = ">>" + String.join(">>", categories) + ">>";
        return categoryPath;
    }

    private Category categoryRequestToCategoryMapper(CategoryRequest categoryRequest) {
        Slugify slugify = Slugify.builder().build();
        String categoryPath = getCategoryPathFromCategoryRequest(categoryRequest);
        return Category.builder()
                .slug(slugify.slugify(categoryPath))
                .categoryPath(categoryPath)
                .build();
    }

    private CategoryResponse categoryToCategoryResponseMapper(Category category) {
        CategoryResponse categoryResponse = CategoryResponse.builder()
                .id(category.getId())
                .slug(category.getSlug())
                .categoryPath(category.getCategoryPath())
                .build();
        categoryResponse.add(WebMvcLinkBuilder
                .linkTo(WebMvcLinkBuilder.methodOn(CategoryController.class).getCategoryById(categoryResponse.getId()))
                .withSelfRel());
        return categoryResponse;

    }

    @Override
    public Page<CategoryResponse> getAllCategories(int pageSize, int pageNumber, String sortBy,
            Direction order, String rootCategory) {
        Pageable pagable = PageRequest.of(pageNumber, pageSize, order, sortBy);
        Page<Category> categoryPage;
        if (rootCategory.equals(""))
            categoryPage = categoryRepository.findAll(pagable);
        else {
            log.info("Using Regex ....");
            categoryPage = categoryRepository.findByRegexPaged(">>" + rootCategory + ">>", pagable);
        }
        return categoryPage.map(this::categoryToCategoryResponseMapper);

    }

    @Override
    public CategoryResponse getCategoryById(String categoryId) {
        Optional<Category> categoryCheck = categoryRepository.findById(categoryId);
        CategoryResponse categoryResponse;
        if (categoryCheck.isPresent()) {
            Category category = categoryCheck.get();
            categoryResponse = categoryToCategoryResponseMapper(category);
        } else {
            // TODO: raise 404
            return null;
        }
        log.info("Category Service: Returned Category successfully!");
        return categoryResponse;
    }

    @Override
    public void createCategory(CategoryRequest categoryRequest) {
        Category category = categoryRequestToCategoryMapper(categoryRequest);
        categoryRepository.save(category);
        log.info("Category is saved successfully!");

    }

    @Override
    public void bulkCreateCategories(List<CategoryRequest> categoryRequestList) {
        List<Category> categoryList = mapToCategoryList(categoryRequestList);
        categoryRepository.saveAll(categoryList);
        log.info("Added All Categories Successfully!");
    }

    private List<Category> mapToCategoryList(List<CategoryRequest> categoryRequestList) {
        return categoryRequestList.stream().map(this::categoryRequestToCategoryMapper).toList();
    }

    @Override
    public void removeCategoryById(String categoryId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'removeCategoryById'");
    }

    @Override
    public void bulkRemoveCategories(List<String> categoryIdList) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'bulkRemoveCategories'");
    }

    @Override
    public List<Category> getValidatedCategories(List<CategoryRequest> categoryRequestList) {
        // List<String> slugList =
        // mapToCategoryList(categoryRequestList).stream().map(Category::getSlug).toList();
        // List<Category> categoryList = categoryRepository.findBySlugIn(slugList);
        List<Category> categoryList = categoryRequestList.stream()
                .map(categoryRequest -> categoryRepository
                        .findByRegex("^" + getCategoryPathFromCategoryRequest(categoryRequest)))
                .flatMap(List::stream).toList();
        if (categoryList.size() != 0) {
            return categoryList;
        } else {
            // TODO: Exception Handling with Status Codes.
            log.info(categoryRequestList.toString());
            // log.info(slugList.toString());
            log.info(categoryList.toString());
            return Collections.emptyList();
            // throw new IllegalStateException("There is atleast one invalid category!");
        }

    }

    @Override
    public List<String> getSubCategories(String category) {
        if (category.trim().equals("")) {
            return categoryRepository.findAll().stream().map(categoryModel -> {
                String[] strCategoryList = categoryModel.getCategoryPath().split(">>");
                if (strCategoryList.length > 0)
                    return strCategoryList[1];
                return null;
            }).filter(s -> s != null).distinct().toList();
        }
        List<Category> categoryList = categoryRepository.findByRegex(">>" + category + ">>");
        return categoryList.stream().map(categoryModel -> {
            String[] strCategoryList = categoryModel.getCategoryPath().split(">>");
            int i = 0;
            for (i = 0; i < strCategoryList.length; i++) {
                if (strCategoryList[i].equals(category))
                    break;
            }
            if (i + 1 < strCategoryList.length)
                return strCategoryList[i + 1];
            return null;

        }).filter(s -> s != null).distinct().toList();
    }

    @Override
    public List<Category> getCategoryByName(String category) {
        return categoryRepository.findByRegex(">>" + category.trim() + ">>");
    }

}
