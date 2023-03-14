package com.flipkart.clone.productmanagement.service.catalog;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort.Direction;

import com.flipkart.clone.productmanagement.dto.catalog.CategoryRequest;
import com.flipkart.clone.productmanagement.dto.catalog.CategoryResponse;
import com.flipkart.clone.productmanagement.model.catalog.Category;

public interface CategoryService {
    public Page<CategoryResponse> getAllCategories(int pageSize, int pageNumber, String sortBy,
            Direction order,String rootCategory);

    public CategoryResponse getCategoryById(String categoryId);

    public void createCategory(CategoryRequest categoryRequest);

    public void bulkCreateCategories(List<CategoryRequest> categoryRequestList);

    public void removeCategoryById(String categoryId);

    public void bulkRemoveCategories(List<String> categoryIdList);

    public List<Category> getValidatedCategories(List<CategoryRequest> categoryRequestList);

}
