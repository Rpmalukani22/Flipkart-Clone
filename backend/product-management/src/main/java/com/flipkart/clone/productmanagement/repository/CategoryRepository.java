package com.flipkart.clone.productmanagement.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.flipkart.clone.productmanagement.entity.Category;

public interface CategoryRepository extends MongoRepository<Category, String> {
    List<Category> findBySlugIn(List<String> slugList);

}