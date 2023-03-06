package com.flipkart.clone.productmanagement.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.flipkart.clone.productmanagement.model.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

}
