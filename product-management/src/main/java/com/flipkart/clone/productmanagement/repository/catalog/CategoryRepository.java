/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Tuesday, 4th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
package com.flipkart.clone.productmanagement.repository.catalog;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.flipkart.clone.productmanagement.model.catalog.Category;

public interface CategoryRepository extends MongoRepository<Category, String> {
    List<Category> findBySlugIn(List<String> slugList);

    @Query("{'categoryPath': { $regex: ?0, $options:'i' }}")
    Page<Category> findByRegexPaged(final String regexString, Pageable pageable);

    @Query("{'categoryPath': { $regex: ?0, $options:'i' }}")
    List<Category> findByRegex(final String regexString);

}
