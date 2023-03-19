package com.flipkart.clone.productmanagement.repository.catalog;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.flipkart.clone.productmanagement.model.catalog.Product;

public interface ProductRepository extends MongoRepository<Product, String> {
    @Query("{\"categoryList.$id\": {$in:?0}}")
    Page<Product> getProductsByCategoryIds(List<ObjectId> categoryIdList, Pageable pageable);

    Optional<Product> findBySlug(String slug);

}
