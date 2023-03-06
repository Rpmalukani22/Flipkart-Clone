package com.flipkart.clone.productmanagement.service;

import java.util.Arrays;
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
import com.flipkart.clone.productmanagement.dto.CategoryRequest;
import com.flipkart.clone.productmanagement.dto.CategoryResponse;
import com.flipkart.clone.productmanagement.entity.Category;
import com.flipkart.clone.productmanagement.repository.CategoryRepository;
import com.github.slugify.Slugify;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    // Mappers

    private Category categoryRequestToCategoryMapper(CategoryRequest categoryRequest) {
        Slugify slugify = Slugify.builder().build();
        List<String> categories = Arrays.asList(categoryRequest.getCategoryPath().split(">>")).stream()
                .map(String::trim).toList();
        String categoryPath = String.join(">>", categories);
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
        categoryResponse.add(WebMvcLinkBuilder.linkTo(CategoryController.class)
                .slash(categoryResponse.getId())
                .withSelfRel());
        return categoryResponse;

    }

    @Override
    public Page<CategoryResponse> getAllCategories(int pageSize, int pageNumber, String sortBy,
            Direction order) {
        Pageable pagable = PageRequest.of(pageNumber, pageSize, order, sortBy);
        Page<Category> categoryPage = categoryRepository.findAll(pagable);
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
        log.info("ProductService: Returned Product successfully!");
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
        List<String> slugList = mapToCategoryList(categoryRequestList).stream().map(Category::getSlug).toList();
        List<Category> categoryList = categoryRepository.findBySlugIn(slugList);
        if (categoryList.size() == slugList.size()) {
            return categoryList;
        } else {
            // TODO: Exception Handling with Status Codes.
            throw new IllegalStateException("There is atleast one invalid category!");
        }

    }

}
