package com.flipkart.clone.productmanagement.repository.catalog;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.flipkart.clone.productmanagement.model.catalog.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

}
