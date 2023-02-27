package com.flipkart.clone.productmanagement.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.flipkart.clone.productmanagement.entity.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

}
