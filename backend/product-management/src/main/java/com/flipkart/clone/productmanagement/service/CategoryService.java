package com.flipkart.clone.productmanagement.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort.Direction;

import com.flipkart.clone.productmanagement.dto.CategoryRequest;
import com.flipkart.clone.productmanagement.dto.CategoryResponse;
import com.flipkart.clone.productmanagement.model.Category;

public interface CategoryService {
    public Page<CategoryResponse> getAllCategories(int pageSize, int pageNumber, String sortBy,
            Direction order);

    public CategoryResponse getCategoryById(String categoryId);

    public void createCategory(CategoryRequest categoryRequest);

    public void bulkCreateCategories(List<CategoryRequest> categoryRequestList);

    public void removeCategoryById(String categoryId);

    public void bulkRemoveCategories(List<String> categoryIdList);

    public List<Category> getValidatedCategories(List<CategoryRequest> categoryRequestList);

}
